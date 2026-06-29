export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Kategoriler', href: '/kategoriler' },
  { label: 'Kitap Kirala', href: '/kirala' },
  { label: 'Kitap Sat', href: '/sat' },
  { label: 'Favoriler', href: '/favoriler' },
  { label: 'Sepet', href: '/sepet' },
  { label: 'Giriş Yap', href: '/giris' },
];
