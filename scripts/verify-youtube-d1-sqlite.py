"""Verify an exported YouTube D1 archive against the checked-in movie source.

Local SQLite only: this script does not connect to Cloudflare or alter any
production database. Invoked by tests/youtube-d1-full-parity.test.mjs.
"""
import json
import sqlite3
import sys

schema_path, source_path, *sql_files = sys.argv[1:]
with open(source_path, encoding="utf-8") as source_file:
    expected = json.load(source_file)["movies"]

db = sqlite3.connect(":memory:")
with open(schema_path, encoding="utf-8") as schema_file:
    db.executescript(schema_file.read())

for filename in sql_files:
    with open(filename, encoding="utf-8") as batch_file:
        db.executescript(batch_file.read())

records = db.execute(
    "SELECT slug,canonical_path,editorial_status,published_at,verified_at,payload_json "
    "FROM content_items WHERE pillar='movies_entertainment' AND kind='youtube-movie'"
).fetchall()
found = {row[0]: row for row in records}
assert len(found) == len(expected)

sources = db.execute(
    "SELECT i.slug,s.source_url,s.source_name,s.source_kind,s.checked_at "
    "FROM content_sources s JOIN content_items i ON s.content_id=i.id "
    "WHERE i.pillar='movies_entertainment' AND i.kind='youtube-movie'"
).fetchall()
source_map = {row[0]: row for row in sources}
assert len(source_map) == len(expected)

for movie in expected:
    video_id = movie["videoId"]
    row = found[video_id]
    assert row[1] == "/entertainment/youtube/" + video_id
    assert row[2] == "draft"
    assert row[3] == movie["publishedAt"]
    assert row[4] == movie["lastChecked"]
    assert json.loads(row[5]) == movie
    source = source_map[video_id]
    assert source[1:] == (
        movie["videoUrl"], movie["channelName"], "publisher", movie["lastChecked"]
    )

assert db.execute("SELECT count(*) FROM content_search").fetchone()[0] == len(expected)
assert db.execute("PRAGMA foreign_key_check").fetchall() == []
assert db.execute("PRAGMA integrity_check").fetchone()[0] == "ok"

first_id = expected[0]["videoId"]
db.execute(
    "UPDATE content_items SET editorial_status=? WHERE slug=?",
    ("published", first_id),
)
with open(sql_files[0], encoding="utf-8") as first_batch:
    db.executescript(first_batch.read())
assert db.execute(
    "SELECT editorial_status FROM content_items WHERE slug=?", (first_id,)
).fetchone()[0] == "published"
assert db.execute("SELECT count(*) FROM content_sources").fetchone()[0] == len(expected)

print(json.dumps({
    "validatedMovies": len(expected),
    "sqlBatches": len(sql_files),
    "publisherSources": len(sources),
    "ftsRows": len(expected),
    "editorialStatusPreserved": True,
}))
