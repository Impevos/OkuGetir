import { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navigation';

function navLinkClass(isActive: boolean, isLogin: boolean) {
  if (isLogin) {
    return isActive
      ? 'ml-2 rounded-lg bg-oku-green-dark px-3 py-2 text-sm font-medium text-white'
      : 'ml-2 rounded-lg bg-oku-green px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-oku-green-dark';
  }

  return isActive
    ? 'rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-oku-green'
    : 'rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-oku-green';
}

function mobileNavLinkClass(isActive: boolean, isLogin: boolean) {
  if (isLogin) {
    return isActive
      ? 'block rounded-lg bg-oku-green-dark px-4 py-3 text-sm font-medium text-white'
      : 'block rounded-lg bg-oku-green px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-oku-green-dark';
  }

  return isActive
    ? 'block rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-oku-green'
    : 'block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-oku-green';
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-oku-green transition-colors hover:text-oku-green-light"
        >
          <BookOpen className="h-7 w-7 text-oku-blue" aria-hidden="true" />
          <span>Oku Getir</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
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
          className="inline-flex items-center justify-center rounded-lg p-2 text-oku-green transition-colors hover:bg-emerald-50 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-emerald-100 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isLogin = link.label === 'Giriş Yap';
              return (
                <li key={link.href}>
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
      )}
    </header>
  );
}
