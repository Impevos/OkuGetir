import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      <p className="mt-4 text-slate-600">Bu sayfa henüz hazırlanıyor.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
      >
        Ana Sayfaya Dön
      </Link>
    </section>
  );
}
