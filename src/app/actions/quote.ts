"use server";

import { quoteServices } from "@/lib/services";
import { site } from "@/lib/site";

export type QuoteField = "name" | "phone" | "email" | "service" | "vehicle" | "message";

export type QuoteState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<QuoteField, string>>;
      values?: Partial<Record<QuoteField, string>>;
    };

const LIMITS: Record<QuoteField, number> = { name: 100, phone: 30, email: 160, service: 60, vehicle: 120, message: 2000 };

const read = (formData: FormData, key: QuoteField) => String(formData.get(key) ?? "").trim().slice(0, LIMITS[key]);

/**
 * Quote requests are delivered by Formspree (https://formspree.io), which
 * emails them to the address set on the form in your Formspree dashboard.
 *
 * Required env (see .env.example):
 *   FORMSPREE_FORM_ID — the ID from your form's endpoint, https://formspree.io/f/<FORM_ID>
 *
 * If it isn't configured, the form tells the visitor to call or email instead
 * of pretending the request went through.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company") ?? "").length > 0) {
    return { status: "success", name: "" };
  }

  const values = {
    name: read(formData, "name"),
    phone: read(formData, "phone"),
    email: read(formData, "email"),
    service: read(formData, "service"),
    vehicle: read(formData, "vehicle"),
    message: read(formData, "message"),
  } satisfies Record<QuoteField, string>;

  const fieldErrors: Partial<Record<QuoteField, string>> = {};
  if (values.name.length < 2) fieldErrors.name = "Please enter your name.";
  if (values.phone.replace(/\D/g, "").length < 10) fieldErrors.phone = "Please enter a phone number we can reach you at.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) fieldErrors.email = "That email doesn't look right.";
  if (!quoteServices.some((s) => s === values.service)) fieldErrors.service = "Please choose a service.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    console.error("[quote] FORMSPREE_FORM_ID not set — quote request was NOT delivered.");
    return {
      status: "error",
      message: `Online requests are temporarily unavailable. Please call ${site.phone.display} or email ${site.email} — we'd love to help.`,
      values,
    };
  }

  try {
    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        phone: values.phone,
        // Formspree uses `email` as the reply-to address on the notification.
        email: values.email || undefined,
        service: values.service,
        vehicle: values.vehicle || "—",
        message: values.message || "—",
        _subject: `Quote request: ${values.service} — ${values.name}`,
      }),
    });
    if (!res.ok) {
      console.error("[quote] Formspree responded", res.status, await res.text());
      throw new Error(`Formspree ${res.status}`);
    }
  } catch (err) {
    console.error("[quote] delivery failed", err);
    return {
      status: "error",
      message: `Something went wrong sending your request. Please call ${site.phone.display} or email ${site.email}.`,
      values,
    };
  }

  return { status: "success", name: values.name.split(" ")[0] };
}
