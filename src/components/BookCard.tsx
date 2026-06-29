import { Link } from 'react-router-dom';
import type { Book } from '../types/book';
import ConditionBadge from './ConditionBadge';

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/kitap/${book.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
    >
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
          </div>
        )}
        {!book.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Mevcut Değil
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <ConditionBadge condition={book.condition} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
        <p className="text-xs text-gray-400 mt-1">{book.category}</p>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div className="space-y-0.5">
            {book.rentPrice != null && (
              <p className="text-sm text-gray-600">
                Kira: <span className="font-semibold text-primary-600">{book.rentPrice}₺</span>
              </p>
            )}
            {book.salePrice != null && (
              <p className="text-sm text-gray-600">
                Satış: <span className="font-semibold text-gray-900">{book.salePrice}₺</span>
              </p>
            )}
          </div>
          <span className="text-xs text-gray-400">{book.sellerName}</span>
        </div>
      </div>
    </Link>
  );
}
