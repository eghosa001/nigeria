-- Optional MyNigeriaGuide persistence for Cloudflare D1.
-- The public website does not require this database.

CREATE TABLE IF NOT EXISTS correction_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('incorrect_fee','outdated_requirement','broken_link','other')),
  message TEXT NOT NULL,
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewing','resolved','dismissed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS correction_reports_status_created_idx
ON correction_reports(status, created_at DESC);

CREATE TABLE IF NOT EXISTS verification_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL,
  source_url TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('checked','change_detected','conflict_detected','approved','rejected')),
  previous_value TEXT,
  observed_value TEXT,
  reviewer_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS verification_events_service_created_idx
ON verification_events(service_slug, created_at DESC);
