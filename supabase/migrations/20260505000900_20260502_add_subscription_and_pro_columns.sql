/*
  # Add subscription columns to users_profile

  1. Changes
    - Add `is_pro` (boolean, default false)
    - Add `subscribed_at` (timestamptz, nullable)
    - Add `is_subscribed` (boolean, default false)
    - Backfill: users with is_pro = true are marked as subscribed

  2. Notes
    - All additions are idempotent via IF NOT EXISTS checks
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'is_pro'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN is_pro boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'subscribed_at'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN subscribed_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users_profile' AND column_name = 'is_subscribed'
  ) THEN
    ALTER TABLE users_profile ADD COLUMN is_subscribed boolean NOT NULL DEFAULT false;
  END IF;
END $$;

UPDATE users_profile SET is_subscribed = true WHERE is_pro = true;
