/**
 * Presentation-only guards. Never change stored fees, issuer evidence or URLs.
 * A money figure is considered repeated only when every figure in the fee
 * label is already visible in the summary. Different prices stay visible.
 */
export function leadAlreadyStatesFee(summary: string, feeLabel: string): boolean {
  const amounts = (value: string) =>
    [...value.matchAll(/[₦$£€]\s*\d[\d,]*(?:\.\d+)?/gu)]
      .map((match) => match[0].replace(/[\s,]/g, "").toLowerCase());
  const expected = [...new Set(amounts(feeLabel))];
  if (expected.length) {
    const displayed = new Set(amounts(summary));
    return expected.every((amount) => displayed.has(amount));
  }
  const fee = feeLabel.trim().replace(/\s+/g, " ").toLowerCase();
  const lead = summary.replace(/\s+/g, " ").toLowerCase();
  if (fee === "free") return /\bfree\b/i.test(lead);
  return fee.length >= 18 && lead.includes(fee);
}

/**
 * Suppress the same introductory paragraph when a destination's short
 * summary already says substantially the same thing. Exact/near-exact copy
 * only; partially overlapping paragraphs may contain new, useful details.
 */
function comparable(value: string): string {
  return value.toLocaleLowerCase("en").replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
}

export function uniqueIntroParagraphs(summary: string, paragraphs: readonly string[]): string[] {
  const prior = [comparable(summary)];
  return paragraphs.filter((paragraph) => {
    const item = comparable(paragraph);
    if (!item) return false;
    const isCopy = prior.some((seen) =>
      item === seen || (item.length >= 70 && seen.length >= 70 &&
        Math.min(item.length, seen.length) / Math.max(item.length, seen.length) >= 0.9 &&
        (item.includes(seen) || seen.includes(item))));
    if (!isCopy) prior.push(item);
    return !isCopy;
  });
}

/**
 * Keep evidence and safety notes, but do not print the exact same sentence
 * again when another visible section already carries it. Never merge two
 * partially overlapping cautions: the difference may be legally important.
 */
export function uniqueSupportingStatements(
  alreadyShown: readonly string[],
  supplementary: readonly string[],
): string[] {
  const seen = new Set(alreadyShown.map(comparable).filter(Boolean));
  return supplementary.filter((statement) => {
    const key = comparable(statement);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
