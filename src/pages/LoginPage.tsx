import { FormEvent, useEffect, useState } from 'react';
import { Lock, LogIn, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ActionToast } from '../components/ui/ActionToast';
import { DEMO_ACCOUNTS, isDemoLoggedIn, loginDemoUser } from '../lib/demoSession';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isDemoLoggedIn()) navigate('/', { replace: true });
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();
    const result = loginDemoUser(normalizedEmail, password);

    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setMessage('Giriş başarılı! Yönlendiriliyorsunuz…');
    setLoading(false);

    setTimeout(() => navigate('/'), 800);
  };

  const fillDemo = (accountEmail: string) => {
    setEmail(accountEmail);
    setPassword('demo123');
    setError(null);
  };

  return (
    <section className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_8px_30px_rgba(45,106,79,0.08)]">
        <div className="bg-gradient-to-br from-emerald-50 via-cream to-sky-50 px-6 py-8 text-center sm:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-oku-green text-white shadow-md">
            <User className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Giriş Yap
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            Oku Getir hesabınla giriş yap, favorilerini ve sepetini yönet.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 sm:px-8">
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-oku-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-oku-green/20 transition-all hover:bg-oku-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
          </button>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-oku-green">
              Demo hesaplar
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Şifre: <span className="font-medium text-slate-800">demo123</span> (veya 4+ karakter)
            </p>
            <ul className="mt-3 space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <li key={account.email} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-slate-700">
                    <span className="font-medium text-slate-800">{account.name}</span>
                    <span className="block text-xs text-slate-500">{account.email}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fillDemo(account.email)}
                    className="shrink-0 font-semibold text-oku-blue transition-colors hover:text-oku-blue-light"
                  >
                    Doldur
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </form>

        <div className="border-t border-emerald-100 px-6 py-5 text-center text-sm text-slate-600 sm:px-8">
          Hesabın yok mu?{' '}
          <Link to="/kayit" className="font-semibold text-oku-green hover:text-oku-green-dark">
            Kayıt ol
          </Link>
        </div>
      </div>

      <ActionToast message={message} />
    </section>
  );
}
