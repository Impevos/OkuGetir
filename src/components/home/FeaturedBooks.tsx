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
    <section
      id="one-cikan-kitaplar"
      className="scroll-mt-24 bg-white/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 border-b border-emerald-100/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oku-blue">
              Popüler seçkiler
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Öne Çıkan Kitaplar
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              En çok tercih edilen ikinci el kitapları incele, anında kirala veya satın al.
            </p>
          </div>
          <a
            href="/kategoriler"
            className="mx-auto inline-flex shrink-0 items-center justify-center rounded-xl border border-emerald-200 bg-cream px-5 py-2.5 text-sm font-semibold text-oku-green transition-all hover:border-oku-green/30 hover:bg-white hover:shadow-sm sm:mx-0"
          >
            Tümünü Gör
          </a>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: FEATURED_COUNT }).map((_, i) => (
              <div
                key={i}
                className="h-[28rem] animate-pulse rounded-2xl bg-gradient-to-b from-emerald-100/70 to-emerald-50/40"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-center text-sm text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
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
      </div>
    </section>
  );
}
