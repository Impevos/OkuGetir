import { useBooks } from '../../../hooks/useBooks';
import { useFavorites } from '../../../hooks/useFavorites';
import { useCart } from '../../../hooks/useCart';
import { BookCard } from '../books/BookCard';
import { ActionToast } from '../ui/ActionToast';
import { useActionToast } from '../../hooks/useActionToast';

const FEATURED_COUNT = 6;

export function FeaturedBooks() {
  const { books, loading, error } = useBooks();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { message, showMessage } = useActionToast();

  const featuredBooks = books.slice(0, FEATURED_COUNT);

  const handleToggleFavorite = async (bookId: string) => {
    try {
      if (isFavorite(bookId)) {
        await removeFromFavorite(bookId);
        showMessage('Favorilerden çıkarıldı.');
      } else {
        await addToFavorite(bookId);
        showMessage('Favorilere eklendi.');
      }
    } catch {
      showMessage('İşlem yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleAddToCart = async (bookId: string) => {
    try {
      await addToCart(bookId);
      showMessage('Sepete eklendi.');
    } catch {
      showMessage('Sepete eklenemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <section id="one-cikan-kitaplar" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Öne Çıkan Kitaplar</h2>
        <p className="mt-2 text-slate-600">
          En popüler ikinci el kitapları keşfet, kirala veya satın al.
        </p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: FEATURED_COUNT }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl bg-emerald-100/60"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={isFavorite(book.id)}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <ActionToast message={message} />
    </section>
  );
}
