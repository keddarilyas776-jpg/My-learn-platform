import { useState } from 'react'
import { Eye, EyeOff, BookOpen, Loader as Loader2, CircleAlert as AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import LegalModal from '../components/LegalModal'

type Mode = 'login' | 'signup'
type LegalDoc = 'terms' | 'privacy' | null

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [legalDoc, setLegalDoc] = useState<LegalDoc>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
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
              <button type="button" onClick={() => setLegalDoc('terms')} className="text-primary-600 hover:underline">شروط الاستخدام</button>
              {' '}و{' '}
              <button type="button" onClick={() => setLegalDoc('privacy')} className="text-primary-600 hover:underline">سياسة الخصوصية</button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-4">
          محمي بتشفير SSL 256-bit
        </p>
      </div>

      {legalDoc && <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />}
    </div>
  )
}
