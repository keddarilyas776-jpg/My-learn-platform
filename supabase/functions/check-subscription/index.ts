import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ subscribed: false, error: "Missing authorization" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role to bypass RLS for the authoritative check
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify the user JWT
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    // 1. التحقق من هوية المستخدم عبر الـ Token المرسل
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. استثناء برمي ذكي لحسابك وحساب ياسين لفتح الكورسات فوراً
    if (user.email === 'keddarilyas776@gmail.com' || user.email === 'yassinahmed@gmail.com') {
      return new Response(
        JSON.stringify({ subscribed: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. للمستخدمين الآخرين: جلب البيانات من قاعدة البيانات للتأكد من اشتراكهم
    const { data: profile, error: dbError } = await supabaseClient
      .from('users_profile')
      .select('is_subscribed')
      .eq('id', user.id)
      .single();

    if (dbError || !profile) {
      return new Response(
        JSON.stringify({ subscribed: false }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ subscribed: profile.is_subscribed }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ subscribed: false, error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Server-side authoritative check — cannot be manipulated by client
    const { data: profile, error: profileError } = await supabase
      .from("users_profile")
      .select("is_subscribed")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      return new Response(
        JSON.stringify({ subscribed: false, error: "Profile lookup failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subscribed = profile?.is_subscribed === true;

    return new Response(
      JSON.stringify({ subscribed }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ subscribed: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
