-- MyNigeriaGuide scale content store for Cloudflare D1.
-- Prepared for the Million-Search Expansion. Do not bind a production
-- database until the real Cloudflare D1 database has been created.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS content_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pillar TEXT NOT NULL CHECK (pillar IN ('movies_entertainment','services','tour_nigeria','jobs_careers')),
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  canonical_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  keywords TEXT NOT NULL DEFAULT '',
  payload_json TEXT NOT NULL DEFAULT '{}',
  editorial_status TEXT NOT NULL DEFAULT 'draft'
    CHECK (editorial_status IN ('draft','verified','published','stale','expired','archived')),
  published_at TEXT,
  verified_at TEXT,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (pillar, kind, slug)
);

CREATE INDEX IF NOT EXISTS content_items_public_idx
ON content_items(pillar, kind, editorial_status, updated_at DESC);

CREATE INDEX IF NOT EXISTS content_items_expiry_idx
ON content_items(editorial_status, expires_at)
WHERE expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS content_items_verified_idx
ON content_items(pillar, verified_at DESC);

CREATE TABLE IF NOT EXISTS content_sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_id INTEGER NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  source_url TEXT NOT NULL,
  source_name TEXT,
  source_kind TEXT NOT NULL DEFAULT 'official'
    CHECK (source_kind IN ('official','publisher','employer','venue','primary','secondary')),
  checked_at TEXT NOT NULL,
  note TEXT,
  UNIQUE (content_id, source_url)
);

CREATE INDEX IF NOT EXISTS content_sources_content_idx
ON content_sources(content_id, checked_at DESC);

CREATE TABLE IF NOT EXISTS content_refresh_queue (
  content_id INTEGER PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
  priority INTEGER NOT NULL DEFAULT 100,
  reason TEXT NOT NULL,
  due_at TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_attempt_at TEXT
);

CREATE INDEX IF NOT EXISTS content_refresh_due_idx
ON content_refresh_queue(due_at, priority);

-- D1 supports SQLite FTS5. External-content mode keeps the search index tied
-- to the canonical content_items row while avoiding a second copy of the
-- non-search payload.
CREATE VIRTUAL TABLE IF NOT EXISTS content_search USING fts5(
  title,
  summary,
  keywords,
  content='content_items',
  content_rowid='id',
  tokenize='unicode61 remove_diacritics 2'
);

CREATE TRIGGER IF NOT EXISTS content_items_search_insert
AFTER INSERT ON content_items BEGIN
  INSERT INTO content_search(rowid, title, summary, keywords)
  VALUES (new.id, new.title, new.summary, new.keywords);
END;

CREATE TRIGGER IF NOT EXISTS content_items_search_delete
AFTER DELETE ON content_items BEGIN
  INSERT INTO content_search(content_search, rowid, title, summary, keywords)
  VALUES ('delete', old.id, old.title, old.summary, old.keywords);
END;

CREATE TRIGGER IF NOT EXISTS content_items_search_update
AFTER UPDATE OF title, summary, keywords ON content_items BEGIN
  INSERT INTO content_search(content_search, rowid, title, summary, keywords)
  VALUES ('delete', old.id, old.title, old.summary, old.keywords);
  INSERT INTO content_search(rowid, title, summary, keywords)
  VALUES (new.id, new.title, new.summary, new.keywords);
END;
