import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import ConditionBadge from '../components/ConditionBadge';

export default function FavoritesPage() {
  const { favorites, loading, error, removeFromFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorilerim</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.88-4.5 2.17A6.41 6.41 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Favori listeniz boş</h2>
          <p className="text-gray-400 mb-6">Beğendiğiniz kitapları favorilere ekleyin.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Kitaplara Göz At
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4"
            >
              <Link to={`/kitap/${fav.bookId}`} className="shrink-0">
                <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden">
                  {fav.book?.image ? (
                    <img
                      src={fav.book.image}
                      alt={fav.book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1 min-w-0 flex flex-col">
                <Link to={`/kitap/${fav.bookId}`} className="hover:text-primary-600 transition-colors">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {fav.book?.title ?? 'Yükleniyor...'}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{fav.book?.author}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">{fav.book?.category}</span>
                  {fav.book && <ConditionBadge condition={fav.book.condition} />}
                </div>

                <div className="mt-auto pt-2 flex items-end gap-3">
                  {fav.book?.rentPrice != null && (
                    <span className="text-sm text-primary-600 font-medium">
                      Kira: {fav.book.rentPrice}₺
                    </span>
                  )}
                  {fav.book?.salePrice != null && (
                    <span className="text-sm text-gray-900 font-medium">
                      Satış: {fav.book.salePrice}₺
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2 self-center">
                <button
                  onClick={async () => {
                    if (fav.book) await addToCart(fav.bookId);
                  }}
                  disabled={!fav.book?.isAvailable}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Sepete ekle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </button>
                <button
                  onClick={() => removeFromFavorite(fav.bookId)}
                  className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Favorilerden çıkar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.88-4.5 2.17A6.41 6.41 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
