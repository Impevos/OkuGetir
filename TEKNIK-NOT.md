# Teknik Not — Oku Getir Veri Katmanı (Final)

**Tarih:** 25 Haziran 2026  
**Repo:** https://github.com/Impevos/OkuGetir  
**Supabase:** nakbtmsafmbishqwiwqy (Oku Getir - Eticaret)

## Veri kaynağı

- **Production / geliştirme:** Supabase (aktif)
- **Yedek / offline:** `dummy-data.json` — `.env` yoksa hook'lar otomatik kullanır

## Kitap alanları (eksiksiz)

Tüm kitaplarda zorunlu: `id`, `title`, `author`, `description`, `categoryId`, `category`, `categorySlug`, `image`, `condition`, `rentPrice` ve/veya `salePrice`, `isAvailable`, `sellerName`, `createdAt`.

`condition`: `'yeni' | 'iyi' | 'orta'`

## Supabase doğrulama

| Tablo / View | Kayıt |
|--------------|-------|
| categories | 8 |
| books | 8 |
| cart_items | 2 |
| favorites | 3 |
| books_with_category | OK (camelCase) |

## Validasyon

```bash
node scripts/validate-data.mjs
```

## Bilinen sınırlamalar

- RLS kapalı (geliştirme) — canlıya çıkmadan açılacak
- Auth yok — `DEMO_USER_ID` ile sepet/favori test edilir
- UI frontend bu repoda değil; hook import ile entegre edilir

## Dosya referansları

- Kitap listesi: `books-list.json`
- Tam mock store: `dummy-data.json`
- Tipler: `types/book.ts`
- Kurulum SQL: `supabase-setup.sql`
