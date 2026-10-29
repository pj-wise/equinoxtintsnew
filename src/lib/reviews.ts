/**
 * Customer reviews. The previous site did not publish any reviews, so this is
 * intentionally empty — the Reviews section stays hidden until real,
 * attributable reviews are added (e.g. copied with permission from Google or
 * Facebook). Never add invented or paraphrased reviews here.
 */
export type Review = {
  quote: string;
  author: string;
  /** e.g. "Google review", "Facebook review" */
  source: string;
  /** Optional vehicle, e.g. "2023 Lexus RX350" */
  vehicle?: string;
  /** Link to the original review, if public. */
  href?: string;
};

export const reviews: Review[] = [];
