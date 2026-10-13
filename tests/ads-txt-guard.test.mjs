import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const PUBLISHER_ID = "pub-7517898921176341";
const ADS_LINE = "google.com, " + PUBLISHER_ID + ", DIRECT, f08c47fec0942fa0";

test("ads.txt is a static public asset, not a Worker-dependent route", () => {
  assert.equal(readFileSync("public/ads.txt", "utf8"), ADS_LINE + "\n");
  assert.equal(existsSync("app/ads.txt/route.ts"), false,
    "A runtime /ads.txt route could shadow the static file or return 404");
});

test("static ads.txt matches the production AdSense publisher identifier", () => {
  const config = readFileSync("lib/adsense-config.ts", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.match(config, new RegExp("ca-" + PUBLISHER_ID));
  assert.match(layout, /import \{ ADSENSE_CLIENT \} from "@\/lib\/adsense-config"/);
  assert.match(layout, /adsbygoogle\\.js\\?client=\$\{ADSENSE_CLIENT\}/);
});
