// React kütüphanesinden gerekli parçaları içe aktar
// React: JSX kullanabilmek için gerekli
import React from "react";

// Footer bileşenine özel CSS dosyasını içe aktar
// Bu sayede stiller ayrı dosyada tutulur, kod daha düzenli olur
import "./Footer.css";

// Footer bileşeni: sayfanın en altında görünen sabit bölüm
// function ile tanımlanmış basit bir React bileşenidir
function Footer() {
  // JSX return bloğu: ekranda görünecek HTML benzeri yapı
  return (
    // footer etiketi: semantik HTML, sayfa alt bilgisi için
    // className="footer": CSS dosyasındaki .footer sınıfını uygular
    <footer className="footer">
      {/* Ana içerik kapsayıcısı: 4 sütunlu grid yapısı */}
      <div className="footer-container">
        {/* === 1. BÖLÜM: Oku Getir Proje Açıklaması === */}
        <div className="footer-section">
          {/* Bölüm başlığı: marka adı */}
          <h3 className="footer-title">Oku Getir</h3>
          {/* Kısa proje açıklaması: platformun ne yaptığını anlatır */}
          <p className="footer-description">
            İkinci el kitapları uygun fiyatla satın alabileceğiniz veya
            kiralayabileceğiniz modern bir kitap platformu.
          </p>
        </div>

        {/* === 2. BÖLÜM: Hızlı Linkler === */}
        <div className="footer-section">
          {/* Bölüm başlığı */}
          <h3 className="footer-title">Hızlı Linkler</h3>
          {/* Link listesi: ul (unordered list) ile sırasız liste */}
          <ul className="footer-links">
            {/* Ana Sayfa linki */}
            <li>
              {/* href="#": şimdilik aynı sayfaya yönlendirir, ileride route eklenir */}
              <a href="#">Ana Sayfa</a>
            </li>
            {/* Kategoriler sayfası linki */}
            <li>
              <a href="#">Kategoriler</a>
            </li>
            {/* Kitap kiralama sayfası linki */}
            <li>
              <a href="#">Kitap Kirala</a>
            </li>
            {/* Kitap satma / kiraya verme sayfası linki */}
            <li>
              <a href="#">Kitap Sat</a>
            </li>
          </ul>
        </div>

        {/* === 3. BÖLÜM: Kategoriler === */}
        <div className="footer-section">
          {/* Bölüm başlığı */}
          <h3 className="footer-title">Kategoriler</h3>
          {/* Kategori linkleri listesi */}
          <ul className="footer-links">
            {/* Roman kategorisi */}
            <li>
              <a href="#">Roman</a>
            </li>
            {/* Ders kitapları kategorisi */}
            <li>
              <a href="#">Ders Kitapları</a>
            </li>
            {/* Yazılım kategorisi */}
            <li>
              <a href="#">Yazılım</a>
            </li>
            {/* Akademik kitaplar kategorisi */}
            <li>
              <a href="#">Akademik</a>
            </li>
          </ul>
        </div>

        {/* === 4. BÖLÜM: İletişim ve Sosyal Medya === */}
        <div className="footer-section">
          {/* Bölüm başlığı */}
          <h3 className="footer-title">İletişim</h3>
          {/* İletişim bilgileri paragrafı */}
          <div className="footer-contact">
            {/* E-posta adresi: mailto ile tıklanınca e-posta uygulaması açılır */}
            <p>
              <a href="mailto:info@okugetir.com">info@okugetir.com</a>
            </p>
            {/* Konum bilgisi: düz metin, link değil */}
            <p>İstanbul / Türkiye</p>
          </div>

          {/* Sosyal medya ikonları kapsayıcısı */}
          <div className="footer-social">
            {/* Instagram profil linki */}
            {/* target="_blank": yeni sekmede açar */}
            {/* rel="noopener noreferrer": güvenlik için gerekli */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              {/* SVG ikon: Instagram logosu (basit kamera şekli) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Instagram ikon path'i */}
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Twitter (X) profil linki */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              {/* Twitter/X ikonu SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn profil linki */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              {/* LinkedIn ikonu SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Alt bilgi satırı: telif hakkı ve kullanım notu */}
      <div className="footer-bottom">
        {/* Dinamik yıl: new Date().getFullYear() o anki yılı otomatik yazar */}
        <p>
          &copy; {new Date().getFullYear()} Oku Getir. Tüm hakları saklıdır.
          Bu platform eğitim amaçlı geliştirilmiştir.
        </p>
      </div>
    </footer>
  );
}

// Footer bileşenini dışa aktar: diğer dosyalarda import edilebilmesi için
// export default: bu dosyanın varsayılan export'u Footer'dır
export default Footer;
