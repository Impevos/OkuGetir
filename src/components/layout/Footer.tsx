import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Kategoriler', href: '/kategoriler' },
  { label: 'Kitap Kirala', href: '/kirala' },
  { label: 'Kitap Sat', href: '/sat' },
] as const;

const CATEGORY_LINKS = [
  { label: 'Roman', href: '/kategoriler/roman' },
  { label: 'Ders Kitapları', href: '/kategoriler/lise-ders-kitaplari' },
  { label: 'Yazılım', href: '/kategoriler/yazilim-ve-teknoloji' },
  { label: 'Akademik', href: '/kategoriler/akademik-kitaplar' },
] as const;

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: TwitterIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
] as const;

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FooterLinkList({
  links,
}: {
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            to={link.href}
            className="text-sm text-slate-500 transition-colors hover:text-oku-green"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-emerald-100/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-oku-green">Oku Getir</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              İkinci el kitapları uygun fiyatla satın alabileceğiniz veya
              kiralayabileceğiniz modern bir kitap platformu.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-oku-green">Hızlı Linkler</p>
            <FooterLinkList links={QUICK_LINKS} />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-oku-green">Kategoriler</p>
            <FooterLinkList links={CATEGORY_LINKS} />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-oku-green">İletişim</p>
            <div className="space-y-1 text-sm text-slate-500">
              <p>
                <a
                  href="mailto:info@okugetir.com"
                  className="transition-colors hover:text-oku-green"
                >
                  info@okugetir.com
                </a>
              </p>
              <p>İstanbul / Türkiye</p>
            </div>

            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-oku-green text-white transition-all hover:bg-oku-green-dark hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-100/80 pt-6 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} Oku Getir. Tüm hakları saklıdır. Bu
            platform eğitim amaçlı geliştirilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
}
2026 Oku Getir 