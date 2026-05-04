/*
  # Add is_subscribed column to users_profile

  1. Changes
    - `users_profile`
      - Add `is_subscribed` (boolean, default false) — the authoritative server-side
        flag that controls whether a user has paid the $1 subscription fee.
      - Backfill existing rows: users who already have `is_pro = true` are treated
        as subscribed so no existing paid users lose access.

  2. Notes
    - The old `is_pro` column is kept for backwards compatibility with existing
      client code and will read from `is_subscribed` going forward.
    - RLS policies already exist on this table; no new policies are needed here
      because access is gated by the Edge Function using the service role key.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'is_subscribed'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN is_subscribed boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Backfill: anyone already marked is_pro counts as subscribed
UPDATE users_profile SET is_subscribed = true WHERE is_pro = true;
