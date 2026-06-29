import { useBooks } from '../../../hooks/useBooks';
import { useFavorites } from '../../../hooks/useFavorites';
import { useCart } from '../../../hooks/useCart';
import { BookCard } from '../books/BookCard';

const FEATURED_COUNT = 6;

export function FeaturedBooks() {
  const { books, loading, error } = useBooks();
  const { favorites, addToFavorite, removeFromFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const featuredBooks = books.slice(0, FEATURED_COUNT);
  const favoriteIds = new Set(favorites.map((f) => f.bookId));

  const handleToggleFavorite = async (bookId: string) => {
    if (isFavorite(bookId)) {
      await removeFromFavorite(bookId);
    } else {
      await addToFavorite(bookId);
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
              isFavorite={favoriteIds.has(book.id)}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
