import { expect, test } from "@playwright/test";

test("Cloudflare serves ads.txt without Worker runtime or AdSense environment variables", async ({ request }) => {
  const response = await request.get("/ads.txt", { failOnStatusCode: false });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^text\/plain\b/i);
  expect(await response.text()).toBe("google.com, pub-7517898921176341, DIRECT, f08c47fec0942fa0\n");
});
