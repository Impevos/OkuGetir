export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-lg font-semibold text-oku-green">Oku Getir</p>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Oku Getir — İkinci el kitap kiralama ve satış platformu.
          </p>
        </div>
      </div>
    </footer>
  );
}
