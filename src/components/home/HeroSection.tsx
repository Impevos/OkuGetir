import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Wallet } from 'lucide-react';

const TRUST_POINTS = [
  { icon: Wallet, text: 'Uygun kiralama ve satış fiyatları' },
  { icon: ShieldCheck, text: 'Güvenli alışveriş deneyimi' },
  { icon: BookOpen, text: 'Ders kitabından romana geniş seçki' },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-cream to-sky-50">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-oku-green/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-oku-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-oku-green shadow-sm backdrop-blur-sm sm:text-sm">
            <Sparkles className="h-4 w-4 text-oku-blue" aria-hidden="true" />
            İkinci el kitap kiralama & satış platformu
          </span>

          <h1 className="text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            İkinci el kitapları{' '}
            <span className="bg-gradient-to-r from-oku-green to-oku-green-light bg-clip-text text-transparent">
              güvenle kirala
            </span>
            ,{' '}
            <span className="bg-gradient-to-r from-oku-blue to-oku-blue-light bg-clip-text text-transparent">
              uygun fiyatla satın al
            </span>
            .
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg lg:text-xl">
            Oku Getir ile ders kitaplarından romanlara binlerce ikinci el kitaba tek tıkla
            ulaş. Kirala, sat veya kendi kitabını listele — bütçene ve okuma alışkanlığına
            uygun, sürdürülebilir bir kitap deneyimi yaşa.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#one-cikan-kitaplar"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-oku-green px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-oku-green/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-oku-green-dark hover:shadow-xl hover:shadow-oku-green/25 active:translate-y-0 sm:min-w-[200px]"
            >
              Kitapları Keşfet
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="/sat"
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-200/80 bg-cream/80 px-7 py-4 text-sm font-semibold text-oku-blue shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-oku-blue/30 hover:bg-white hover:shadow-md active:translate-y-0 sm:min-w-[240px]"
            >
              Kitabını Sat / Kiraya Ver
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-oku-green" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
