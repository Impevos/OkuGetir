import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ActionToast } from '../components/ui/ActionToast';
import { useActionToast } from '../hooks/useActionToast';
import { formatPrice } from '../utils/bookHelpers';

export function CartPage() {
  const { items, loading, error, removeFromCart } = useCart();
  const { message, showMessage } = useActionToast();

  const handleRemove = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId);
      showMessage('Sepetten çıkarıldı.');
    } catch {
      showMessage('İşlem yapılamadı. Lütfen tekrar deneyin.');
    }
  };

  const total = items.reduce((sum, item) => {
    const price = item.book?.salePrice ?? item.book?.rentPrice ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          <ShoppingCart className="h-7 w-7 text-oku-green" aria-hidden="true" />
          Sepetim
        </h1>
        <p className="mt-2 text-slate-600">Kiralamak veya satın almak istediğin kitaplar.</p>
      </div>

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-emerald-100/60" />
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
          <p className="mt-4 text-lg font-medium text-slate-700">Sepetin boş</p>
          <p className="mt-2 text-sm text-slate-500">
            Kitap kartlarındaki &quot;Sepete Ekle&quot; butonunu kullanabilirsin.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-oku-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-oku-green-dark"
          >
            Kitaplara Göz At
          </Link>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {item.book?.image && (
                  <img
                    src={item.book.image}
                    alt={item.book.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-slate-900">
                  {item.book?.title ?? 'Kitap'}
                </h2>
                <p className="text-sm text-slate-500">{item.book?.author}</p>
                <p className="mt-1 text-sm text-slate-600">Adet: {item.quantity}</p>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                <p className="font-semibold text-oku-green">
                  {formatPrice(item.book?.salePrice ?? item.book?.rentPrice ?? null)}
                </p>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Kaldır
                </button>
              </div>
            </article>
          ))}

          <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 px-6 py-4">
            <span className="font-medium text-slate-700">Toplam (tahmini)</span>
            <span className="text-xl font-bold text-oku-green">{formatPrice(total)}</span>
          </div>
        </div>
      )}

      <ActionToast message={message} />
    </section>
  );
}
