import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { CartPage } from './pages/CartPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryPage } from './pages/CategoryPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favoriler" element={<FavoritesPage />} />
          <Route path="/sepet" element={<CartPage />} />
          <Route path="/kategoriler" element={<CategoriesPage />} />
          <Route path="/kategoriler/:slug" element={<CategoryPage />} />
          <Route path="/kirala" element={<PlaceholderPage title="Kitap Kirala" />} />
          <Route path="/sat" element={<PlaceholderPage title="Kitap Sat" />} />
          <Route path="/giris" element={<PlaceholderPage title="Giriş Yap" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
