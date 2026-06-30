import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import { useCart } from '../../hooks/useCart';
import { useCategories } from '../../hooks/useCategories';
import { useFavorites } from '../../hooks/useFavorites';
import { BookCard } from '../components/books/BookCard';
import { ActionToast } from '../components/ui/ActionToast';
import { useActionToast } from '../hooks/useActionToast';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { categories } = useCategories();
  const { books, loading, error } = useBooks(slug);
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { message, showMessage } = useActionToast();

  const category = categories.find((c) => c.slug === slug);
  const title = category?.name ?? slug.replace(/-/g, ' ');

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
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        to="/kategoriler"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-oku-green hover:text-oku-green-dark"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Tüm kategoriler
      </Link>

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-slate-600">
          {loading ? 'Kitaplar yükleniyor…' : `${books.length} kitap bulundu.`}
        </p>
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

      {!loading && !error && books.length === 0 && (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
          <p className="text-lg font-medium text-slate-700">Bu kategoride henüz kitap yok</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
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
