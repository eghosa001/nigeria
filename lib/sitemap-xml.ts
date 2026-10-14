/**
 * Escape XML 1.0 text without emitting characters forbidden by the XML spec.
 * Source content may originate from third-party film descriptions.
 */
export function escapeSitemapXml(value: string): string {
  const legal = Array.from(value).filter((char) => {
    const point = char.codePointAt(0)!;
    return point === 0x9 || point === 0xa || point === 0xd ||
      (point >= 0x20 && point <= 0xd7ff) ||
      (point >= 0xe000 && point <= 0xfffd) ||
      (point >= 0x10000 && point <= 0x10ffff);
  }).join("");
  return legal.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
