/**
 * Editorial voice review signals, not detection of who or what wrote a passage.
 * No automatic substitutions: context, tone and factual accuracy outrank regexes.
 */
export type VoiceSignal = {
  id: string;
  label: string;
  occurrences: number;
};

const VOICE_RULES = [
  { id: "staged-opening", label: "Staged opening", pattern: /\b(?:let'?s (?:dive|delve|explore) (?:in|into)|in today'?s (?:fast[- ]paced )?world|in this (?:article|guide),? we (?:will|shall))\b/gi },
  { id: "stock-inflation", label: "Generic promotional language", pattern: /\b(?:delve into|tapestry of|pivotal role|game[- ]changer|remarkable journey|captivating experience|unparalleled experience|hidden gem|bustling hub|vibrant tapestry)\b/gi },
  { id: "empty-contrast", label: "Formulaic contrast to check", pattern: /\b(?:not just|not merely|more than just)\b.{0,65}\b(?:but also|but (?:a|an|the)|it'?s)\b/gi },
  { id: "text-narration", label: "Article narration", pattern: /\b(?:this (?:article|guide|post) (?:will|aims to)|in this (?:article|guide) we(?:'ll| will))\b/gi },
  { id: "generic-importance", label: "Unsupported significance wording", pattern: /\b(?:stands as a testament|underscores the importance|serves as a reminder|a must[- ]visit|undoubtedly one of|needless to say)\b/gi },
] as const;

/** Signal counts are suggestive only; a useful, sourced contrast may stay. */
export function auditEditorialVoice(prose: string): VoiceSignal[] {
  const normalized = prose.replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
  if (!normalized) return [];
  return VOICE_RULES.flatMap(rule => {
    const hits = normalized.match(rule.pattern);
    return hits?.length ? [{ id: rule.id, label: rule.label, occurrences: hits.length }] : [];
  });
}
