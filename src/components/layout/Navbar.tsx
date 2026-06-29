import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants/navigation';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-oku-green transition-colors hover:text-oku-green-light"
        >
          <BookOpen className="h-7 w-7 text-oku-blue" aria-hidden="true" />
          <span>Oku Getir</span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-oku-green ${
                  link.label === 'Giriş Yap'
                    ? 'ml-2 bg-oku-green text-white hover:bg-oku-green-dark hover:text-white'
                    : 'text-slate-600'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-oku-green transition-colors hover:bg-emerald-50 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobile}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-oku-green ${
                    link.label === 'Giriş Yap'
                      ? 'bg-oku-green text-white hover:bg-oku-green-dark hover:text-white'
                      : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
