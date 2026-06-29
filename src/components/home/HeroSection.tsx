import { ArrowRight, BookMarked } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-cream to-sky-50">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-oku-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-oku-blue/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-oku-green shadow-sm ring-1 ring-emerald-100">
            <BookMarked className="h-4 w-4" aria-hidden="true" />
            İkinci el kitap platformu
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            İkinci el kitapları kolayca{' '}
            <span className="text-oku-green">kirala</span> veya{' '}
            <span className="text-oku-blue">satın al.</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Ders kitaplarından romanlara kadar birçok kitabı uygun fiyatla keşfet.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#one-cikan-kitaplar"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-oku-green px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-oku-green-dark hover:shadow-lg sm:w-auto"
            >
              Kitapları Keşfet
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/sat"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-oku-blue bg-white px-6 py-3.5 text-sm font-semibold text-oku-blue transition-all hover:bg-sky-50 sm:w-auto"
            >
              Kitabını Sat / Kiraya Ver
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
