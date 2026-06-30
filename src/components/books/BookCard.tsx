import { Eye, Heart, ShoppingCart } from 'lucide-react';
import type { Book } from '../../../types/book';
import {
  CONDITION_LABELS,
  CONDITION_STYLES,
  formatPrice,
} from '../../utils/bookHelpers';

interface BookCardProps {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string) => void;
  onAddToCart?: (bookId: string) => void;
}

export function BookCard({
  book,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
}: BookCardProps) {
  const placeholderImage =
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100/80 bg-white shadow-[0_8px_30px_rgba(45,106,79,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-[0_16px_40px_rgba(45,106,79,0.12)]">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <img
          src={book.image ?? placeholderImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          type="button"
          aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          onClick={() => onToggleFavorite?.(book.id)}
          className="absolute right-3 top-3 rounded-full border border-white/60 bg-white/95 p-2.5 shadow-md backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-400'
            }`}
          />
        </button>
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${CONDITION_STYLES[book.condition]}`}
        >
          {CONDITION_LABELS[book.condition]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-oku-blue">
          {book.category}
        </p>
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-slate-900">
          {book.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">{book.author}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-cream/80 p-3">
          <div>
            <span className="text-xs text-slate-400">Kiralama</span>
            <p className="mt-0.5 text-sm font-bold text-oku-green">{formatPrice(book.rentPrice)}</p>
          </div>
          <div>
            <span className="text-xs text-slate-400">Satış</span>
            <p className="mt-0.5 text-sm font-bold text-oku-blue">{formatPrice(book.salePrice)}</p>
          </div>
        </div>

        {!book.isAvailable && (
          <p className="mt-3 text-xs font-semibold text-amber-600">Şu an müsait değil</p>
        )}

        <div className="mt-auto flex gap-2.5 pt-5">
          <a
            href={`/kitap/${book.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-oku-green/40 hover:text-oku-green"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Detay
          </a>
          <button
            type="button"
            disabled={!book.isAvailable}
            onClick={() => onAddToCart?.(book.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-oku-green px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-oku-green-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
