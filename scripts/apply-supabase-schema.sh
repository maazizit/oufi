#!/usr/bin/env bash
# Apply supabase/migrations/001_initial.sql to the linked project.
# Requires: SUPABASE_ACCESS_TOKEN (https://supabase.com/dashboard/account/tokens)
# and database password (or DATABASE_URL with pooler).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REF="${SUPABASE_PROJECT_REF:-cuwtknywzfyvhuuvvrpd}"

if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" && -z "${DATABASE_URL:-}" ]]; then
  echo "Missing SUPABASE_ACCESS_TOKEN or DATABASE_URL." >&2
  echo "Get a token: https://supabase.com/dashboard/account/tokens" >&2
  echo "Get anon key + URL: https://supabase.com/dashboard/project/${REF}/settings/api" >&2
  exit 1
fi

cd "$ROOT"

if [[ -n "${DATABASE_URL:-}" ]]; then
  if command -v psql >/dev/null 2>&1; then
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/001_initial.sql
    echo "Schema applied via DATABASE_URL."
    exit 0
  fi
  echo "psql not found; falling back to supabase db push." >&2
fi

npx supabase link --project-ref "$REF" --yes
npx supabase db push --yes
echo "Schema pushed to ${REF}."
