/** Treat channel calls to action and uploader boilerplate as metadata, not movie plots.
 * Pure helper shared by the static catalog and the D1 production renderer.
 */
export function isPublisherPromoSynopsis(value: string) {
  return /\b(?:if you are a subscriber|turn on (?:post )?notifications|click(?:ing)? (?:on )?the ["'“”]?bell|on (?:this|our) (?:youtube )?channel|welcome to (?:this|our) (?:youtube )?channel|you will enjoy the best of|(?:we|our channel) (?:bring|brings|provide|provides|present|presents) (?:you )?(?:the )?best|produces (?:the )?(?:best|latest) (?:nollywood|nigerian|african) movies?)\b/i.test(value);
}
