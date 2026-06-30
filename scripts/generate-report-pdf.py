# -*- coding: utf-8 -*-
"""Oku Getir teslim raporu PDF uretici."""
from fpdf import FPDF
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "OKU-GETIR-RAPOR.pdf"
FONT = r"C:\Windows\Fonts\arial.ttf"
FONT_B = r"C:\Windows\Fonts\arialbd.ttf"


class Report(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "", 9)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Sayfa {self.page_no()}", align="C")


def section_title(pdf, text):
    w = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.set_font("ArialB", "", 13)
    pdf.set_text_color(30, 60, 120)
    pdf.multi_cell(w, 8, text)
    pdf.ln(2)
    pdf.set_text_color(0, 0, 0)


def body(pdf, text):
    w = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.set_font("Arial", "", 10)
    pdf.multi_cell(w, 6, text)
    pdf.ln(2)


def bullet(pdf, text):
    w = pdf.w - pdf.l_margin - pdf.r_margin
    pdf.set_font("Arial", "", 10)
    pdf.multi_cell(w, 6, f"  - {text}")


def main():
    pdf = Report()
    pdf.set_margins(20, 20, 20)
    pdf.add_font("Arial", "", FONT)
    pdf.add_font("ArialB", "", FONT_B)
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()
    w = pdf.w - pdf.l_margin - pdf.r_margin

    pdf.set_font("ArialB", "", 20)
    pdf.set_text_color(30, 60, 120)
    pdf.multi_cell(w, 10, "Oku Getir")
    pdf.set_font("ArialB", "", 14)
    pdf.multi_cell(w, 8, "Backend ve Veri Katmani Teslim Raporu")
    pdf.ln(4)
    pdf.set_font("Arial", "", 10)
    pdf.set_text_color(0, 0, 0)
    body(pdf, "Proje: Oku Getir (Ikinci El Kitap Kiralama / Satis)")
    body(pdf, "Hazirlayan: Mustafa - Backend & Veri Yapisi")
    body(pdf, "Tarih: 25 Haziran 2026")
    body(pdf, "Organizasyon: Impevos Yazilim Ekibi")
    pdf.ln(4)

    section_title(pdf, "1. Ozet")
    body(
        pdf,
        "Oku Getir platformu icin backend veri katmani tamamlandi. Supabase veritabani "
        "semasi olusturuldu, ornek veriler yuklendi, TypeScript tipleri ve frontend "
        "hook'lari yazildi, dokumantasyon hazirlandi ve tum ciktilar GitHub'a push edildi.",
    )
    bullet(pdf, "Canli Supabase: Oku Getir - Eticaret")
    bullet(pdf, "GitHub: https://github.com/Impevos/OkuGetir")
    pdf.ln(4)

    section_title(pdf, "2. Tamamlanan Gorevler")
    tasks = [
        "Kitap veri modeli (types/book.ts, books tablosu)",
        "Kullanici, sepet, favori yapisi (users, cart_items, favorites)",
        "Supabase tablo yapilari (supabase-schema.sql, supabase-setup.sql)",
        "Dummy data yedek dosyasi (dummy-data.json)",
        "Liste / kategori / detay formati (books_with_category view, useBooks)",
        "Frontend dokumantasyonu (README-backend.md)",
        "GitHub commit & push (Impevos/OkuGetir)",
    ]
    for t in tasks:
        bullet(pdf, t)
    pdf.ln(4)

    section_title(pdf, "3. Kabul Kriterleri")
    for k in [
        "Kitap veri yapisi net - TUM ALANLAR TANIMLI",
        "Kategoriler veride mevcut - 8 KATEGORI",
        "Frontend rahat kullanabilmeli - HOOK'LAR HAZIR",
        "Sepet ve favori planlanmis - TABLOLAR + UNIQUE KISITLARI",
    ]:
        bullet(pdf, k)
    pdf.ln(4)

    section_title(pdf, "4. Veri Modeli")
    body(pdf, "Tablolar: categories, users, books, cart_items, favorites")
    body(pdf, "View: books_with_category (join + camelCase alanlar)")
    body(pdf, "Kitap alanlari: id, title, author, description, categoryId, category, "
              "categorySlug, image, condition, rentPrice, salePrice, isAvailable, "
              "sellerName, createdAt")
    body(pdf, "condition degerleri: yeni | iyi | orta")
    pdf.ln(2)
    body(pdf, "Kategoriler: Roman, Kisisel Gelisim, Universite Kitaplari, Lise Ders "
              "Kitaplari, Yazilim ve Teknoloji, Cocuk Kitaplari, Sinav Hazirlik, "
              "Akademik Kitaplar")
    pdf.ln(4)

    section_title(pdf, "5. Supabase Kurulumu")
    bullet(pdf, "Proje adi: Oku Getir - Eticaret")
    bullet(pdf, "Project ID: nakbtmsafmbishqwiwqy")
    bullet(pdf, "URL: https://nakbtmsafmbishqwiwqy.supabase.co")
    bullet(pdf, "Bolge: ap-northeast-1 (Tokyo)")
    bullet(pdf, "SQL: supabase-setup.sql calistirildi (Run without RLS)")
    bullet(pdf, "Ornek veri: 8 kategori, 8 kitap, 1 kullanici, 2 sepet, 3 favori")
    bullet(pdf, "Demo kullanici ID: a1000001-0000-4000-8000-000000000001")
    pdf.ln(4)

    section_title(pdf, "6. GitHub Deposu")
    body(pdf, "https://github.com/Impevos/OkuGetir")
    body(pdf, "Onemli dosyalar: supabase-setup.sql, types/book.ts, hooks/, "
              "dummy-data.json, README-backend.md")
    bullet(pdf, "64476a1 - Ilk backend veri katmani")
    bullet(pdf, "d922fb2 - supabase-setup.sql, seed, demo kullanici duzeltmesi")
    pdf.ln(4)

    section_title(pdf, "7. Frontend Ekibi")
    body(pdf, "git clone https://github.com/Impevos/OkuGetir.git")
    body(pdf, ".env: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (publishable key)")
    body(pdf, "Hook'lar: useBooks, useCategories, useCart, useFavorites")
    body(pdf, "Kitap listesi books_with_category view'indan gelir.")
    pdf.ln(4)

    section_title(pdf, "8. Dogrulama")
    body(pdf, "Supabase REST API ile dogrulandi:")
    bullet(pdf, "categories tablosu - OK")
    bullet(pdf, "books tablosu - OK (8 kitap)")
    bullet(pdf, "books_with_category view - OK")
    pdf.ln(4)

    section_title(pdf, "9. Kapsam Disi / Ileride")
    bullet(pdf, "Row Level Security (RLS) - Auth netlesince")
    bullet(pdf, "Supabase Auth entegrasyonu")
    bullet(pdf, "Kitap ekleme API / satici paneli")
    bullet(pdf, "Production deploy")
    pdf.ln(4)

    section_title(pdf, "10. Sonuc")
    body(
        pdf,
        "Oku Getir backend ve veri yapisi gorevi TAMAMLANMISTIR. Tahmini sure "
        "(5 saat) kapsamindaki tum teslim ciktilari hazirdir. Frontend ekibi "
        "entegrasyona gecebilir.",
    )

    pdf.output(str(OUT))
    print(f"PDF olusturuldu: {OUT}")


if __name__ == "__main__":
    main()
