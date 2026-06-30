export function Footer() {
  return (
    <footer className="border-t border-emerald-100/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-bold text-oku-green">Oku Getir</p>
            <p className="mt-1 text-sm text-slate-500">
              İkinci el kitap kiralama ve satış platformu
            </p>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Oku Getir. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
