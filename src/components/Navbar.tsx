import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';

export default function Navbar() {
  const location = useLocation();
  const { items } = useCart();
  const { favorites } = useFavorites();

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const favCount = favorites.length;

  const linkClass = (path: string) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-primary-100 text-primary-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold text-primary-700">Oku Getir</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="hidden sm:inline">Ana Sayfa</span>
          </Link>

          <Link to="/favoriler" className={linkClass('/favoriler')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.88-4.5 2.17A6.41 6.41 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span className="hidden sm:inline">Favoriler</span>
            {favCount > 0 && (
              <span className="ml-0.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          <Link to="/sepet" className={linkClass('/sepet')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="hidden sm:inline">Sepet</span>
            {cartCount > 0 && (
              <span className="ml-0.5 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
