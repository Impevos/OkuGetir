import { useCallback, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBookById } from '../hooks/useBooks';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import type { Book } from '../types/book';
import ConditionBadge from '../components/ConditionBadge';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorites();

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const result = await getBookById(id);
    setBook(result);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAddToCart = async (type: 'rent' | 'buy') => {
    if (!book) return;
    setAddingToCart(true);
    await addToCart(book.id, type);
    setCartMessage(type === 'rent' ? 'Kiralama sepete eklendi!' : 'Satın alma sepete eklendi!');
    setAddingToCart(false);
    setTimeout(() => setCartMessage(null), 2000);
  };

  const handleToggleFavorite = async () => {
    if (!book) return;
    if (isFavorite(book.id)) {
      await removeFromFavorite(book.id);
    } else {
      await addToFavorite(book.id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kitap Bulunamadı</h2>
        <p className="text-gray-500 mb-6">Aradığınız kitap mevcut değil veya kaldırılmış olabilir.</p>
        <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  const fav = isFavorite(book.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Geri
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Kitap Görseli */}
          <div className="bg-gray-100 aspect-[3/4] md:aspect-auto relative">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 min-h-[400px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>
              </div>
            )}
            {!book.isAvailable && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-lg font-medium">
                  Mevcut Değil
                </span>
              </div>
            )}
          </div>

          {/* Kitap Bilgileri */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-lg text-gray-600 mt-1">{book.author}</p>
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`shrink-0 p-2.5 rounded-full border transition-all ${
                  fav
                    ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                    : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-red-500'
                }`}
                title={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.88-4.5 2.17A6.41 6.41 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {book.category}
              </span>
              <ConditionBadge condition={book.condition} />
              {book.isAvailable ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  Mevcut
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Mevcut Değil
                </span>
              )}
            </div>

            {book.description && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Açıklama</h2>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Satıcı</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                  {book.sellerName.charAt(0)}
                </div>
                <span className="font-medium text-gray-900">{book.sellerName}</span>
              </div>
            </div>

            <div className="mt-auto pt-6 space-y-3">
              {cartMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm text-center animate-pulse">
                  {cartMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {book.rentPrice != null && (
                  <button
                    onClick={() => handleAddToCart('rent')}
                    disabled={!book.isAvailable || addingToCart}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                    Kirala — {book.rentPrice}₺
                  </button>
                )}
                {book.salePrice != null && (
                  <button
                    onClick={() => handleAddToCart('buy')}
                    disabled={!book.isAvailable || addingToCart}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Satın Al — {book.salePrice}₺
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
