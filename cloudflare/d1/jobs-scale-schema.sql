-- Jobs & Careers normalized scale schema.
-- Prepared for migration from checked-in TypeScript before the client catalog
-- approaches 500 records. This file does not bind or mutate a production D1 DB.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS job_employers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('Government','Private','International')),
  official_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_records (
  content_id INTEGER PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
  employer_id INTEGER NOT NULL REFERENCES job_employers(id) ON DELETE RESTRICT,
  record_kind TEXT NOT NULL CHECK (record_kind IN ('vacancy','programme','recruitment-exercise','career-page')),
  status TEXT NOT NULL CHECK (status IN ('open','closed','screening','training','career-page','upcoming')),
  status_label TEXT NOT NULL,
  location_text TEXT NOT NULL DEFAULT '',
  employment_type_text TEXT NOT NULL DEFAULT '',
  date_posted TEXT,
  deadline TEXT,
  official_application_url TEXT NOT NULL,
  schema_job_title TEXT,
  schema_employment_type TEXT,
  source_checked_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS job_records_employer_idx
ON job_records(employer_id, status, source_checked_at DESC);

CREATE INDEX IF NOT EXISTS job_records_deadline_idx
ON job_records(status, deadline)
WHERE deadline IS NOT NULL;

CREATE INDEX IF NOT EXISTS job_records_posted_idx
ON job_records(date_posted DESC)
WHERE date_posted IS NOT NULL;

CREATE TABLE IF NOT EXISTS job_record_locations (
  job_content_id INTEGER NOT NULL REFERENCES job_records(content_id) ON DELETE CASCADE,
  location_slug TEXT NOT NULL,
  locality TEXT,
  region TEXT,
  country TEXT NOT NULL DEFAULT 'NG',
  PRIMARY KEY (job_content_id, location_slug)
);

CREATE INDEX IF NOT EXISTS job_record_locations_lookup_idx
ON job_record_locations(location_slug, job_content_id);

CREATE TABLE IF NOT EXISTS job_record_professions (
  job_content_id INTEGER NOT NULL REFERENCES job_records(content_id) ON DELETE CASCADE,
  profession_slug TEXT NOT NULL,
  PRIMARY KEY (job_content_id, profession_slug)
);

CREATE INDEX IF NOT EXISTS job_record_professions_lookup_idx
ON job_record_professions(profession_slug, job_content_id);
