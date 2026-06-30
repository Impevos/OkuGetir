# Sepet ve Favori — Veri Mantığı

## Sepet (cart_items)

| Alan | Tip | Açıklama |
|------|-----|----------|
| id | UUID | Sepet satırı kimliği |
| userId | UUID | Hangi kullanıcı |
| bookId | UUID | Hangi kitap |
| quantity | number | Adet (varsayılan 1) |
| addedAt | datetime | Eklenme zamanı |
| book? | Book | UI için opsiyonel kitap detayı |

**Kural:** `(userId, bookId)` unique — aynı kitap sepete iki kez ayrı satır olarak eklenemez; tekrar eklenirse `quantity` artar.

**Hook:** `useCart()` → `addToCart(bookId)`, `removeFromCart(cartItemId)`

---

## Favori (favorites)

| Alan | Tip | Açıklama |
|------|-----|----------|
| id | UUID | Favori kaydı kimliği |
| userId | UUID | Hangi kullanıcı |
| bookId | UUID | Hangi kitap |
| addedAt | datetime | Eklenme zamanı |
| book? | Book | UI için opsiyonel kitap detayı |

**Kural:** `(userId, bookId)` unique — aynı kitap favoriye bir kez eklenir.

**Hook:** `useFavorites()` → `addToFavorite(bookId)`, `removeFromFavorite(bookId)`, `isFavorite(bookId)`

---

## Supabase vs dummy

| Mod | Sepet/favori nerede? |
|-----|----------------------|
| Supabase (.env dolu) | `cart_items`, `favorites` tabloları |
| Dummy (.env boş) | `dummy-data.json` + tarayıcı `localStorage` |

Auth gelene kadar demo kullanıcı ID sabit: `DEMO_USER_ID` (`lib/dummyStore.ts`).
