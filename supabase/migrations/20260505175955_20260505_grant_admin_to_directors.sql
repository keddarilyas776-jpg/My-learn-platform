/*
  # Grant Admin Role to Platform Directors

  Sets is_admin = true for:
  - keddarilyas776@gmail.com (id: 41f43658-0c69-4c5b-93fd-f8425ec372b6)
  - yassinahmed@gmail.com    (id: 2e9fa22c-8666-46d1-9911-ab5e0051eac5)

  Also upserts their users_profile rows so the admin flag is reliably present
  even if they registered before the is_admin column existed.
*/

INSERT INTO users_profile (id, display_name, coins, badge, is_pro, is_subscribed, is_admin)
VALUES
  ('41f43658-0c69-4c5b-93fd-f8425ec372b6', 'قدار إلياس',   1250, 'مدير المنصة', true, true, true),
  ('2e9fa22c-8666-46d1-9911-ab5e0051eac5', 'ياسين أحمد',   1250, 'مدير المنصة', true, true, true)
ON CONFLICT (id) DO UPDATE
  SET is_admin     = true,
      is_pro       = true,
      is_subscribed = true,
      badge        = 'مدير المنصة';
