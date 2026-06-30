import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { BookCard } from '../components/books/BookCard';
import { ActionToast } from '../components/ui/ActionToast';
import { useActionToast } from '../hooks/useActionToast';

export function FavoritesPage() {
  const { favorites, loading, error, loggedIn, addToFavorite, removeFromFavorite, isFavorite } =
    useFavorites();
  const { message, showMessage } = useActionToast();

  const handleToggleFavorite = async (bookId: string) => {
    try {
      if (isFavorite(bookId)) {
        await removeFromFavorite(bookId);
        showMessage('Favorilerden çıkarıldı.');
      } else {
        await addToFavorite(bookId);
        showMessage('Favorilere eklendi.');
      }
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'İşlem yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          <Heart className="h-7 w-7 text-red-500" aria-hidden="true" />
          Favorilerim
        </h1>
        <p className="mt-2 text-slate-600">Beğendiğin kitapları burada görebilirsin.</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-2xl bg-emerald-100/60" />
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {!loading && !error && !loggedIn && (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
          <Heart className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
          <p className="mt-4 text-lg font-medium text-slate-700">Favorilerini görmek için giriş yap</p>
          <p className="mt-2 text-sm text-slate-500">
            Giriş yaptığında favorilerin sadece senin hesabına bağlı olur.
          </p>
          <Link
            to="/giris"
            className="mt-6 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
          >
            Giriş Yap
          </Link>
        </div>
      )}

      {!loading && !error && loggedIn && favorites.length === 0 && (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
          <Heart className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
          <p className="mt-4 text-lg font-medium text-slate-700">Henüz favori kitabın yok</p>
          <p className="mt-2 text-sm text-slate-500">
            Ana sayfadaki kalp ikonuna basarak favorilere ekleyebilirsin.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
          >
            Kitaplara Göz At
          </Link>
        </div>
      )}

      {!loading && !error && loggedIn && favorites.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) =>
            favorite.book ? (
              <BookCard
                key={favorite.id}
                book={favorite.book}
                isFavorite
                onToggleFavorite={handleToggleFavorite}
              />
            ) : null,
          )}
        </div>
      )}

      <ActionToast message={message} />
    </section>
  );
}
