import { FormEvent, useEffect, useState } from 'react';
import { Lock, Mail, User, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ensureDemoUserInSupabase } from '../../lib/ensureDemoUser';
import { ActionToast } from '../components/ui/ActionToast';
import { isDemoLoggedIn, registerDemoUser } from '../lib/demoSession';

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDemoLoggedIn()) navigate('/', { replace: true });
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result = registerDemoUser(name, email, password);

    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (result.userId) {
      try {
        await ensureDemoUserInSupabase(result.userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Hesap oluşturulamadı.');
        setLoading(false);
        return;
      }
    }

    setMessage('Hesabın oluşturuldu! Yönlendiriliyorsunuz…');
    setLoading(false);
    setTimeout(() => navigate('/'), 800);
  };

  return (
    <section className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_8px_30px_rgba(45,106,79,0.08)]">
        <div className="bg-gradient-to-br from-emerald-50 via-cream to-sky-50 px-6 py-8 text-center sm:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-oku-blue text-white shadow-md">
            <UserPlus className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Kayıt Ol
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            Ücretsiz hesap oluştur, favorilerini ve sepetini kaydet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 sm:px-8">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Ad Soyad
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adın Soyadın"
                className="w-full rounded-xl border border-emerald-100 bg-cream/50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-oku-green focus:ring-2 focus:ring-oku-green/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              E-posta
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                className="w-full rounded-xl border border-emerald-100 bg-cream/50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-oku-green focus:ring-2 focus:ring-oku-green/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Şifre
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="En az 4 karakter"
                className="w-full rounded-xl border border-emerald-100 bg-cream/50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-oku-green focus:ring-2 focus:ring-oku-green/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Şifre Tekrar
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifreni tekrar gir"
                className="w-full rounded-xl border border-emerald-100 bg-cream/50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-oku-green focus:ring-2 focus:ring-oku-green/20"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-oku-blue px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-oku-blue/20 transition-all hover:bg-oku-blue-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            {loading ? 'Hesap oluşturuluyor…' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="border-t border-emerald-100 px-6 py-5 text-center text-sm text-slate-600 sm:px-8">
          Zaten hesabın var mı?{' '}
          <Link to="/giris" className="font-semibold text-oku-green hover:text-oku-green-dark">
            Giriş yap
          </Link>
        </div>
      </div>

      <ActionToast message={message} />
    </section>
  );
}
