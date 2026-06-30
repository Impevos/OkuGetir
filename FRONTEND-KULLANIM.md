# Frontend — Veri Kullanım Kılavuzu (Kısa)

## Kitap listesi

```tsx
import { useBooks } from '../hooks/useBooks';

const { books, loading, error, usingSupabase } = useBooks();
// books: Book[] — id, title, author, category, rentPrice, salePrice, ...
```

## Kategoriye göre filtre

```tsx
const { books } = useBooks('roman'); // categorySlug
```

## Kitap detay

```tsx
import { getBookById } from '../hooks/useBooks';

const book = await getBookById(id);
```

## Kategoriler

```tsx
import { useCategories } from '../hooks/useCategories';

const { categories } = useCategories();
// { id, name, slug, createdAt }
```

## Sepet

```tsx
import { useCart } from '../hooks/useCart';

const { items, addToCart, removeFromCart } = useCart();
// items[].book — kitap detayı otomatik eklenir
```

## Favoriler

```tsx
import { useFavorites } from '../hooks/useFavorites';

const { favorites, addToFavorite, removeFromFavorite, isFavorite } = useFavorites();
```

## Alan adları (Book)

`id` · `title` · `author` · `description` · `category` · `categorySlug` · `categoryId` · `image` · `condition` · `rentPrice` · `salePrice` · `isAvailable` · `sellerName` · `createdAt`

Tipler: `types/book.ts`

## Demo kullanıcı (geliştirme)

`a1000001-0000-4000-8000-000000000001` — sepet/favori testleri için
