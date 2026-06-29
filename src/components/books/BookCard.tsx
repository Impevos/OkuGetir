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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <img
          src={book.image ?? placeholderImage}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          onClick={() => onToggleFavorite?.(book.id)}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'
            }`}
          />
        </button>
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${CONDITION_STYLES[book.condition]}`}
        >
          {CONDITION_LABELS[book.condition]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-oku-blue">
          {book.category}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-slate-900">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{book.author}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <div>
            <span className="text-slate-400">Kiralama</span>
            <p className="font-semibold text-oku-green">{formatPrice(book.rentPrice)}</p>
          </div>
          <div>
            <span className="text-slate-400">Satış</span>
            <p className="font-semibold text-oku-blue">{formatPrice(book.salePrice)}</p>
          </div>
        </div>

        {!book.isAvailable && (
          <p className="mt-2 text-xs font-medium text-amber-600">Şu an müsait değil</p>
        )}

        <div className="mt-auto flex gap-2 pt-4">
          <a
            href={`/kitap/${book.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-oku-green hover:text-oku-green"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Detay
          </a>
          <button
            type="button"
            disabled={!book.isAvailable}
            onClick={() => onAddToCart?.(book.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-oku-green px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-oku-green-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
