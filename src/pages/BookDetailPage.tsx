import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Package,
  ShoppingCart,
  Tag,
  User,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../hooks/useBooks';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import type { Book } from '../../types/book';
import { ActionToast } from '../components/ui/ActionToast';
import { useActionToast } from '../hooks/useActionToast';
import {
  CONDITION_LABELS,
  CONDITION_STYLES,
  formatPrice,
} from '../utils/bookHelpers';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorites();
  const { message, showMessage } = useActionToast();

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getBookById(id);
      setBook(result);
    } catch {
      setError('Kitap yüklenemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggleFavorite = async () => {
    if (!book) return;
    try {
      if (isFavorite(book.id)) {
        await removeFromFavorite(book.id);
        showMessage('Favorilerden çıkarıldı.');
      } else {
        await addToFavorite(book.id);
        showMessage('Favorilere eklendi.');
      }
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'İşlem yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleAddToCart = async () => {
    if (!book) return;
    try {
      await addToCart(book.id);
      showMessage('Sepete eklendi.');
    } catch (err) {
      showMessage(err instanceof Error ? err.message : 'Sepete eklenemedi. Lütfen tekrar deneyin.');
    }
  };

  const placeholderImage =
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600';

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-8 w-24 animate-pulse rounded-lg bg-emerald-100/70" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="aspect-[3/4] animate-pulse rounded-2xl bg-emerald-100/60" />
          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-emerald-100/60" />
            <div className="h-6 w-1/2 animate-pulse rounded-lg bg-emerald-100/40" />
            <div className="h-32 animate-pulse rounded-2xl bg-emerald-100/40" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !book) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {error ?? 'Kitap bulunamadı'}
        </h1>
        <p className="mt-4 text-slate-600">
          Aradığın kitap mevcut değil veya kaldırılmış olabilir.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
        >
          Ana Sayfaya Dön
        </Link>
      </section>
    );
  }

  const favorite = isFavorite(book.id);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-oku-green"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Geri
      </button>

      <article className="mt-6 overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_8px_30px_rgba(45,106,79,0.08)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[3/4] bg-slate-100 lg:aspect-auto lg:min-h-[520px]">
            <img
              src={book.image ?? placeholderImage}
              alt={book.title}
              className="h-full w-full object-cover"
            />
            {!book.isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
                <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                  Şu an müsait değil
                </span>
              </div>
            )}
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${CONDITION_STYLES[book.condition]}`}
            >
              {CONDITION_LABELS[book.condition]}
            </span>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-oku-blue">
                  {book.category}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {book.title}
                </h1>
                <p className="mt-2 text-lg text-slate-600">{book.author}</p>
              </div>
              <button
                type="button"
                aria-label={favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                onClick={handleToggleFavorite}
                className={`shrink-0 rounded-full border p-3 transition-all ${
                  favorite
                    ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100'
                    : 'border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-cream/80 p-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Package className="h-3.5 w-3.5" aria-hidden="true" />
                  Kiralama
                </div>
                <p className="mt-1 text-xl font-bold text-oku-green">{formatPrice(book.rentPrice)}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                  Satış
                </div>
                <p className="mt-1 text-xl font-bold text-oku-blue">{formatPrice(book.salePrice)}</p>
              </div>
            </div>

            {book.description && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Açıklama
                </h2>
                <p className="mt-2 leading-relaxed text-slate-600">{book.description}</p>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-oku-green text-sm font-bold text-white">
                {book.sellerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-slate-400">Satıcı</p>
                <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <User className="h-3.5 w-3.5 text-oku-green" aria-hidden="true" />
                  {book.sellerName}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
              <button
                type="button"
                disabled={!book.isAvailable}
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-oku-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-oku-green/20 transition-all hover:bg-oku-green-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                Sepete Ekle
              </button>
              <Link
                to="/sepet"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-emerald-200 bg-cream/80 px-6 py-3.5 text-sm font-semibold text-oku-blue transition-all hover:bg-white hover:shadow-sm"
              >
                Sepete Git
              </Link>
            </div>
          </div>
        </div>
      </article>

      <ActionToast message={message} />
    </section>
  );
}
