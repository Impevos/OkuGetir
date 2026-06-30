/**
 * dummy-data.json ve types/book.ts uyumunu doğrular.
 * Çalıştır: node scripts/validate-data.mjs
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'dummy-data.json'), 'utf8'));

const REQUIRED_BOOK = [
  'id', 'title', 'author', 'description', 'categoryId', 'category',
  'categorySlug', 'image', 'condition', 'rentPrice', 'salePrice',
  'isAvailable', 'sellerName', 'createdAt',
];
const CONDITIONS = new Set(['yeni', 'iyi', 'orta']);
let errors = 0;

const slugById = new Map(data.categories.map((c) => [c.id, c.slug]));
const nameById = new Map(data.categories.map((c) => [c.id, c.name]));

for (const book of data.books) {
  for (const key of REQUIRED_BOOK) {
    if (!(key in book)) {
      console.error(`Eksik alan [${book.id}]: ${key}`);
      errors++;
    }
  }
  if (!CONDITIONS.has(book.condition)) {
    console.error(`Geçersiz condition [${book.id}]: ${book.condition}`);
    errors++;
  }
  if (book.rentPrice == null && book.salePrice == null) {
    console.error(`Fiyat yok [${book.id}]`);
    errors++;
  }
  if (slugById.get(book.categoryId) !== book.categorySlug) {
    console.error(`categorySlug uyumsuz [${book.id}]`);
    errors++;
  }
  if (nameById.get(book.categoryId) !== book.category) {
    console.error(`category adı uyumsuz [${book.id}]`);
    errors++;
  }
}

const bookIds = new Set(data.books.map((b) => b.id));
for (const item of [...data.cartItems, ...data.favorites]) {
  if (!bookIds.has(item.bookId)) {
    console.error(`Geçersiz bookId referansı: ${item.bookId}`);
    errors++;
  }
}

if (errors === 0) {
  console.log(`OK: ${data.categories.length} kategori, ${data.books.length} kitap, veri tutarlı.`);
} else {
  console.error(`HATA: ${errors} sorun bulundu.`);
  process.exit(1);
}
