# Frontend ↔ Veri Katmanı Entegrasyon Durumu

## Özet

| Parça | Durum | Nerede |
|-------|--------|--------|
| **Veri katmanı** | ✅ Hazır | `hooks/`, `types/`, `lib/` |
| **Supabase (canlı veri)** | ✅ Bağlı | Oku Getir - Eticaret |
| **UI frontend** | ✅ Aynı repoda | `src/` — hook'ları kullanıyor |

**Frontend arkadaşı birleştirmiş.** `FeaturedBooks` bileşeni `useBooks`, `useCart`, `useFavorites` hook'larını import ediyor.

---

## Çalıştırma

```bash
git clone https://github.com/Impevos/OkuGetir.git
cd OkuGetir
npm install
```

`.env` oluştur (`.env.example` dosyasından):

```env
VITE_SUPABASE_URL=https://nakbtmsafmbishqwiwqy.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

```bash
npm run dev
```

`.env` dolu → Supabase'ten veri  
`.env` boş → `dummy-data.json`

---

## Bağlantı testi

Ana sayfadaki **Öne Çıkan Kitaplar** bölümü hook'lardan gelir. Sepet/favori butonları `useCart` / `useFavorites` kullanır.

Veri doğrulama: `npm run validate:data`
