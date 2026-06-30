import { BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';

export function CategoriesPage() {
  const { categories, loading, error } = useCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          <BookMarked className="h-7 w-7 text-oku-blue" aria-hidden="true" />
          Kategoriler
        </h1>
        <p className="mt-2 text-slate-600">İlgi alanına göre kitapları keşfet.</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-emerald-100/60" />
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/kategoriler/${category.slug}`}
              className="group rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-oku-green hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-xl bg-emerald-50 p-3 text-oku-green transition-colors group-hover:bg-oku-green group-hover:text-white">
                <BookMarked className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{category.name}</h2>
              <p className="mt-1 text-sm text-slate-500">Kitapları gör →</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
