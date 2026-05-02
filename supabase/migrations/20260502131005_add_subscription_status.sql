/*
  # Add Subscription Status to User Profiles

  1. Changes
    - Add `is_pro` boolean column to `users_profile` (default false)
    - Add `subscribed_at` timestamp column (nullable)

  2. Notes
    - Tracks whether a user has an active subscription
    - Used to show PRO badge and unlock premium content
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
END $$;
