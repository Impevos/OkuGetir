import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useCategories } from '../hooks/useCategories';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { books, loading, error } = useBooks(selectedCategory);
  const { categories } = useCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kitapları Keşfet</h1>
        <p className="mt-2 text-gray-500">İkinci el kitapları kirala veya satın al</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug === selectedCategory ? undefined : cat.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Bu kategoride kitap bulunamadı.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
