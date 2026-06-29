import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { items, loading, error, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => {
    const price = item.book?.salePrice ?? item.book?.rentPrice ?? 0;
    return sum + price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mx-auto text-gray-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Sepetiniz boş</h2>
          <p className="text-gray-400 mb-6">Henüz sepete kitap eklemediniz.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Kitaplara Göz At
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4"
            >
              <Link to={`/kitap/${item.bookId}`} className="shrink-0">
                <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden">
                  {item.book?.image ? (
                    <img
                      src={item.book.image}
                      alt={item.book.title}
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
                <Link to={`/kitap/${item.bookId}`} className="hover:text-primary-600 transition-colors">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.book?.title ?? 'Yükleniyor...'}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{item.book?.author}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.book?.category}</p>

                <div className="mt-auto pt-2 flex items-end justify-between">
                  <div>
                    {item.book?.salePrice != null && (
                      <p className="font-semibold text-gray-900">{item.book.salePrice}₺</p>
                    )}
                    {item.book?.rentPrice != null && item.book?.salePrice == null && (
                      <p className="font-semibold text-primary-600">{item.book.rentPrice}₺ / kira</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Adet: {item.quantity}</span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="shrink-0 self-start p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Sepetten çıkar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700">Toplam</span>
              <span className="text-2xl font-bold text-gray-900">{total}₺</span>
            </div>
            <button className="w-full py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">
              Siparişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
