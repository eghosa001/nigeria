import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("high-impression movie titles fit Google snippets including the site suffix", () => {
  const movie = source("app/entertainment/movies/[slug]/page.tsx");
  for (const slug of ["agbara-nla-the-return", "sibe"]) {
    const title = movie.split('"' + slug + '": {')[1]?.split('title: "')[1]?.split('"')[0];
    assert.ok(title, slug + " must retain an explicit title");
    assert.ok((title + " | MyNigeriaGuide").length <= 60, slug + " title is too long");
    assert.match(title, /cast/i);
  }
  assert.match(movie, /Sibe: Bimbo Ademoye Cast & Full Movie/);
  assert.match(movie, /Agbara Nla: The Return — Cast & Cinema/);
});

