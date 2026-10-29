import { quoteServices, type QuoteService } from "@/lib/services";

/** Link to the quote form with a service pre-selected. */
export function quoteHref(service: QuoteService) {
  return `/contact?service=${encodeURIComponent(service)}#quote`;
}

export function parseQuoteService(value: string | null | undefined): QuoteService | undefined {
  return quoteServices.find((s) => s === value);
}
