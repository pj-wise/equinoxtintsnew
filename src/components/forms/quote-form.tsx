"use client";

import { cn } from "cn";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useActionState, useId, type ReactNode } from "react";

import { submitQuote, type QuoteField, type QuoteState } from "@/app/actions/quote";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { parseQuoteService } from "@/lib/quote";
import { quoteServices, type QuoteService } from "@/lib/services";
import { site } from "@/lib/site";

const fieldClass =
  "h-14 rounded-none border-0 border-b border-white/15 bg-transparent px-0 text-base text-bone shadow-none placeholder:text-mist/60 focus-visible:border-teal focus-visible:ring-0 aria-invalid:border-destructive dark:bg-transparent";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="group/field relative">
      <Label htmlFor={id} className="eyebrow text-[0.66rem] text-mist group-focus-within/field:text-teal-bright">
        {label}
        {optional && <span className="normal-case tracking-normal text-mist/70"> (optional)</span>}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const initialState: QuoteState = { status: "idle" };

type QuoteFormProps = { className?: string };

/** Free estimate form; pre-selects the service from `?service=` when present. */
export function QuoteForm(props: QuoteFormProps) {
  return (
    <Suspense fallback={<QuoteFormInner {...props} />}>
      <QuoteFormWithParams {...props} />
    </Suspense>
  );
}

function QuoteFormWithParams(props: QuoteFormProps) {
  const searchParams = useSearchParams();
  return <QuoteFormInner {...props} preselected={parseQuoteService(searchParams.get("service"))} />;
}

function QuoteFormInner({ className, preselected }: QuoteFormProps & { preselected?: QuoteService }) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const uid = useId();

  const err = (f: QuoteField) => (state.status === "error" ? state.fieldErrors?.[f] : undefined);
  const val = (f: QuoteField) => (state.status === "error" ? state.values?.[f] : undefined);
  const a11y = (f: QuoteField): { "aria-invalid"?: boolean; "aria-describedby"?: string } =>
    err(f) ? { "aria-invalid": true, "aria-describedby": `${uid}-${f}-error` } : {};

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className={cn("flex flex-col items-start gap-6 border border-teal/40 bg-teal/[0.06] p-8 sm:p-10", className)}
      >
        <CheckCircle2 aria-hidden className="size-10 text-teal-bright" />
        <h3 className="font-display text-display-sm">Estimate request received{state.name ? `, ${state.name}` : ""}.</h3>
        <p className="max-w-md leading-relaxed text-mist">
          Thanks for reaching out. We&apos;ll get back to you soon. Need an answer sooner? Call us at{" "}
          <a href={site.phone.href} className="text-bone underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className={cn("relative grid gap-8", className)} aria-describedby={`${uid}-status`}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name" error={err("name")}>
          <Input
            id={`${uid}-name`}
            name="name"
            autoComplete="name"
            required
            defaultValue={val("name")}
            placeholder="Your name"
            className={fieldClass}
            {...a11y("name")}
          />
        </Field>
        <Field id={`${uid}-phone`} label="Phone" error={err("phone")}>
          <Input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            defaultValue={val("phone")}
            placeholder="(772) 000-0000"
            className={fieldClass}
            {...a11y("phone")}
          />
        </Field>
        <Field id={`${uid}-email`} label="Email" optional error={err("email")}>
          <Input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={val("email")}
            placeholder="you@example.com"
            className={fieldClass}
            {...a11y("email")}
          />
        </Field>
        <Field id={`${uid}-service`} label="Service" error={err("service")}>
          <NativeSelect
            id={`${uid}-service`}
            name="service"
            required
            defaultValue={val("service") ?? preselected ?? ""}
            className="w-full [&_select]:h-14 [&_select]:rounded-none [&_select]:border-0 [&_select]:border-b [&_select]:border-white/15 [&_select]:bg-transparent [&_select]:px-0 [&_select]:text-base [&_select]:focus-visible:border-teal [&_select]:focus-visible:ring-0 dark:[&_select]:bg-transparent"
            {...a11y("service")}
          >
            <NativeSelectOption value="" disabled>
              Choose a service
            </NativeSelectOption>
            {quoteServices.map((s) => (
              <NativeSelectOption key={s} value={s}>
                {s}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
      </div>

      <Field id={`${uid}-vehicle`} label="Vehicle" optional error={err("vehicle")}>
        <Input
          id={`${uid}-vehicle`}
          name="vehicle"
          defaultValue={val("vehicle")}
          placeholder="Year, make & model — e.g. 2023 Lexus RX350"
          className={fieldClass}
        />
      </Field>

      <Field id={`${uid}-message`} label="Anything else?" optional error={err("message")}>
        <Textarea
          id={`${uid}-message`}
          name="message"
          rows={3}
          defaultValue={val("message")}
          placeholder="Which windows, shade you have in mind, timing…"
          className={cn(fieldClass, "min-h-28 resize-none py-4")}
        />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group/cta inline-flex h-16 items-center justify-between gap-6 bg-teal pl-7 pr-2.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink transition-[background-color,box-shadow] duration-500 hover:bg-teal-bright hover:shadow-[0_10px_40px_-10px_rgb(15_255_255/0.46)] disabled:opacity-70"
        >
          {pending ? "Sending…" : "Request my free estimate"}
          <span className="grid size-10 place-items-center bg-ink/90 text-teal-bright">
            {pending ? (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            ) : (
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover/cta:rotate-45" />
            )}
          </span>
        </button>
        <p className="text-xs text-mist">
          Prefer to talk?{" "}
          <a href={site.phone.href} className="text-bone underline underline-offset-4 hover:text-teal-bright">
            {site.phone.display}
          </a>
        </p>
      </div>

      <div id={`${uid}-status`} aria-live="polite">
        {state.status === "error" && (
          <p role="alert" className="border-l-2 border-destructive bg-destructive/10 px-4 py-3 text-sm text-bone">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
