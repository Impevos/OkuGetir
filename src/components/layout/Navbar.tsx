import { useEffect, useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navigation';

function navLinkClass(isActive: boolean, isLogin = false): string {
  const base =
    'relative rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oku-green/40 focus-visible:ring-offset-2';

  if (isLogin) {
    return `${base} ml-2 bg-oku-green px-4 py-2.5 text-white shadow-sm hover:-translate-y-0.5 hover:bg-oku-green-dark hover:shadow-md active:translate-y-0 ${
      isActive ? 'ring-2 ring-oku-green/30' : ''
    }`;
  }

  if (isActive) {
    return `${base} bg-emerald-50 px-3.5 py-2.5 font-semibold text-oku-green`;
  }

  return `${base} px-3.5 py-2.5 text-slate-600 hover:bg-emerald-50/80 hover:text-oku-green`;
}

function mobileNavLinkClass(isActive: boolean, isLogin = false): string {
  if (isLogin) {
    return `block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-oku-green-dark ${
      isActive ? 'bg-oku-green-dark' : 'bg-oku-green'
    }`;
  }

  return `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-emerald-50 font-semibold text-oku-green'
      : 'text-slate-600 hover:bg-emerald-50 hover:text-oku-green'
  }`;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobile();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/95 shadow-sm shadow-emerald-900/5 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.25rem] lg:px-8"
        aria-label="Ana navigasyon"
      >
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-xl py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oku-green/40 focus-visible:ring-offset-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-oku-green to-oku-green-light text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-oku-green sm:text-xl">
            Oku Getir
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => {
            const isLogin = link.label === 'Giriş Yap';
            return (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) => navLinkClass(isActive, isLogin)}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-white text-oku-green transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oku-green/40 focus-visible:ring-offset-2 xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span
            className={`transition-transform duration-200 ${mobileOpen ? 'rotate-90 scale-95' : 'rotate-0 scale-100'}`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-emerald-100/80 bg-white transition-[max-height,opacity] duration-300 ease-in-out xl:hidden ${
          mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => {
            const isLogin = link.label === 'Giriş Yap';
            return (
              <li key={link.href} className={isLogin ? 'pt-2' : undefined}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  onClick={closeMobile}
                  className={({ isActive }) => mobileNavLinkClass(isActive, isLogin)}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
