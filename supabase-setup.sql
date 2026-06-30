-- ============================================================
-- Oku Getir — TEK SEFERDE KURULUM (şema + örnek veri)
-- Supabase → SQL Editor → yapıştır → Run
-- Proje: Oku Getir - Eticaret
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.categories (id, name, slug) VALUES
  ('c1000001-0000-4000-8000-000000000001', 'Roman', 'roman'),
  ('c1000001-0000-4000-8000-000000000002', 'Kişisel Gelişim', 'kisisel-gelisim'),
  ('c1000001-0000-4000-8000-000000000003', 'Üniversite Kitapları', 'universite-kitaplari'),
  ('c1000001-0000-4000-8000-000000000004', 'Lise Ders Kitapları', 'lise-ders-kitaplari'),
  ('c1000001-0000-4000-8000-000000000005', 'Yazılım ve Teknoloji', 'yazilim-ve-teknoloji'),
  ('c1000001-0000-4000-8000-000000000006', 'Çocuk Kitapları', 'cocuk-kitaplari'),
  ('c1000001-0000-4000-8000-000000000007', 'Sınav Hazırlık', 'sinav-hazirlik'),
  ('c1000001-0000-4000-8000-000000000008', 'Akademik Kitaplar', 'akademik-kitaplar')
ON CONFLICT (slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.users (
  id         UUID PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.books (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  author       TEXT NOT NULL,
  description  TEXT,
  category_id  UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  image        TEXT,
  condition    TEXT NOT NULL CHECK (condition IN ('yeni', 'iyi', 'orta')),
  rent_price   NUMERIC(10, 2),
  sale_price   NUMERIC(10, 2),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  seller_name  TEXT NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT books_at_least_one_price CHECK (
    rent_price IS NOT NULL OR sale_price IS NOT NULL
  )
);

CREATE INDEX IF NOT EXISTS idx_books_category_id ON public.books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_is_available ON public.books(is_available);

CREATE TABLE IF NOT EXISTS public.cart_items (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  book_id  UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);

CREATE TABLE IF NOT EXISTS public.favorites (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  book_id  UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, book_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);

CREATE OR REPLACE VIEW public.books_with_category AS
SELECT
  b.id,
  b.title,
  b.author,
  b.description,
  b.category_id AS "categoryId",
  b.image,
  b.condition,
  b.rent_price  AS "rentPrice",
  b.sale_price  AS "salePrice",
  b.is_available AS "isAvailable",
  b.seller_name AS "sellerName",
  b.created_at  AS "createdAt",
  c.name        AS category,
  c.slug        AS "categorySlug"
FROM public.books b
JOIN public.categories c ON c.id = b.category_id;

-- Örnek veri
INSERT INTO public.users (id, name, email, created_at) VALUES
  ('a1000001-0000-4000-8000-000000000001', 'Ayşe Yılmaz', 'ayse.yilmaz@example.com', '2026-02-01T09:30:00+00'),
  ('b2000001-0000-4000-8000-000000000002', 'Mehmet Demir', 'mehmet.demo@example.com', '2026-02-15T10:00:00+00')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.books (id, title, author, description, category_id, image, condition, rent_price, sale_price, is_available, seller_name, created_at) VALUES
  ('b1000001-0000-4000-8000-000000000001', 'Saatleri Ayarlama Enstitüsü', 'Ahmet Hamdi Tanpınar', 'Türk edebiyatının en önemli romanlarından biri. İstanbul''un değişen yüzünü anlatır.', 'c1000001-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 'iyi', 45, 120, true, 'Mehmet K.', '2026-03-01T14:00:00+00'),
  ('b1000001-0000-4000-8000-000000000002', 'İkigai', 'Héctor García & Francesc Miralles', 'Japonların uzun ve mutlu yaşam sırrını keşfedin.', 'c1000001-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 'yeni', 30, 85, true, 'Zeynep A.', '2026-03-02T10:30:00+00'),
  ('b1000001-0000-4000-8000-000000000003', 'Calculus — Early Transcendentals', 'James Stewart', 'Mühendislik ve matematik bölümü öğrencileri için temel calculus ders kitabı.', 'c1000001-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400', 'orta', 60, 250, true, 'Can D.', '2026-03-03T08:00:00+00'),
  ('b1000001-0000-4000-8000-000000000004', 'TYT Matematik Soru Bankası', 'Karekök Yayınları', 'Lise mezunları için TYT matematik soru bankası, az kullanılmış.', 'c1000001-0000-4000-8000-000000000007', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 'iyi', 25, 90, true, 'Elif S.', '2026-03-04T16:45:00+00'),
  ('b1000001-0000-4000-8000-000000000005', 'Clean Code', 'Robert C. Martin', 'Yazılım geliştiriciler için temiz kod yazma prensipleri.', 'c1000001-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', 'iyi', 40, 180, true, 'Burak T.', '2026-03-05T11:20:00+00'),
  ('b1000001-0000-4000-8000-000000000006', 'Küçük Prens', 'Antoine de Saint-Exupéry', 'Her yaştan okuyucuya hitap eden klasik çocuk kitabı.', 'c1000001-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400', 'yeni', 15, 55, true, 'Deniz M.', '2026-03-06T09:00:00+00'),
  ('b1000001-0000-4000-8000-000000000007', 'Fizik 1 — Mekanik', 'Halliday & Resnick', 'Üniversite fizik dersleri için referans kitap, kiralık.', 'c1000001-0000-4000-8000-000000000008', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', 'orta', 55, NULL, true, 'Oğuz H.', '2026-03-07T13:15:00+00'),
  ('b1000001-0000-4000-8000-000000000008', 'Türk Dili ve Edebiyatı 9', 'MEB Yayınları', '9. sınıf lise ders kitabı, temiz kullanılmış.', 'c1000001-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1497633762303-f6a846b4e567?w=400', 'iyi', 10, 35, false, 'Selin R.', '2026-03-08T17:30:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cart_items (id, user_id, book_id, quantity, added_at) VALUES
  ('ca100001-0000-4000-8000-000000000001', 'a1000001-0000-4000-8000-000000000001', 'b1000001-0000-4000-8000-000000000002', 1, '2026-03-10T08:00:00+00'),
  ('ca100001-0000-4000-8000-000000000002', 'a1000001-0000-4000-8000-000000000001', 'b1000001-0000-4000-8000-000000000005', 1, '2026-03-10T08:05:00+00')
ON CONFLICT (user_id, book_id) DO NOTHING;

INSERT INTO public.favorites (id, user_id, book_id, added_at) VALUES
  ('fa100001-0000-4000-8000-000000000001', 'a1000001-0000-4000-8000-000000000001', 'b1000001-0000-4000-8000-000000000001', '2026-03-09T12:00:00+00'),
  ('fa100001-0000-4000-8000-000000000002', 'a1000001-0000-4000-8000-000000000001', 'b1000001-0000-4000-8000-000000000006', '2026-03-09T12:30:00+00'),
  ('fa100001-0000-4000-8000-000000000003', 'a1000001-0000-4000-8000-000000000001', 'b1000001-0000-4000-8000-000000000004', '2026-03-09T13:00:00+00')
ON CONFLICT (user_id, book_id) DO NOTHING;
