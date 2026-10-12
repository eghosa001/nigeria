-- Future read-parity extension for tour_places. Not applied by this commit.
-- Install only after inspecting the authoritative Cloudflare D1 schema.
-- This adds public-card display fields and preserves shared guide membership.
-- Does NOT publish existing draft/verified rows or change the Worker flag.

CREATE TABLE IF NOT EXISTS tour_place_display (
  place_slug TEXT PRIMARY KEY REFERENCES tour_places(slug) ON DELETE CASCADE,
  tags_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(tags_json)),
  map_query TEXT,
  cost_note TEXT
);

CREATE TABLE IF NOT EXISTS tour_place_guide_memberships (
  place_slug TEXT NOT NULL REFERENCES tour_places(slug) ON DELETE CASCADE,
  guide_slug TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  PRIMARY KEY (guide_slug, position)
);

CREATE INDEX IF NOT EXISTS tour_place_memberships_by_place
ON tour_place_guide_memberships(place_slug, guide_slug);
