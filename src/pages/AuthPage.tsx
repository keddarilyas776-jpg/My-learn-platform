import { useState } from 'react'
import { Eye, EyeOff, BookOpen, Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

type Mode = 'login' | 'signup'

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name } },
        })
        if (signUpError) throw signUpError
        // Create profile row
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('users_profile').upsert({
            id: user.id,
            display_name: name || email.split('@')[0],
            coins: 1250,
          })
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة مجدداً'
      setError(arabicError(msg))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    setError('')
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (googleError) {
      setError('تعذر تسجيل الدخول بـ Google')
      setGoogleLoading(false)
    }
  }

  function arabicError(msg: string) {
    if (msg.includes('Invalid login')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    if (msg.includes('already registered')) return 'هذا البريد الإلكتروني مسجل بالفعل'
    if (msg.includes('Password should')) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    if (msg.includes('valid email')) return 'يرجى إدخال بريد إلكتروني صحيح'
    return msg
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <BookOpen size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-neutral-800">منصة التعلم التفاعلي</h1>
          <p className="text-neutral-500 text-sm mt-1">بوابتك إلى عالم المعرفة</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-neutral-100">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-4 text-sm font-bold transition-all ${
                  mode === m
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {m === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* Google button */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 border border-neutral-200 rounded-xl py-3 px-4 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all mb-5 disabled:opacity-60"
            >
              {googleLoading ? (
                <Loader2 size={18} className="animate-spin text-neutral-400" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
              )}
              المتابعة مع Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-xs text-neutral-400 font-medium">أو</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">الاسم الكامل</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك"
                    required
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all placeholder-neutral-300"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all placeholder-neutral-300 text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all placeholder-neutral-300 pl-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 mt-2"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب مجاني'
                )}
              </button>
            </form>

            <p className="text-xs text-neutral-400 text-center mt-4">
              بالتسجيل أنت توافق على{' '}
              <span className="text-primary-600 cursor-pointer hover:underline">شروط الاستخدام</span>
              {' '}و{' '}
              <span className="text-primary-600 cursor-pointer hover:underline">سياسة الخصوصية</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-4">
          محمي بتشفير SSL 256-bit 🔒
        </p>
      </div>
    </div>
  )
}
