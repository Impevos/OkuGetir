import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/kitap/:id" element={<BookDetailPage />} />
        <Route path="/sepet" element={<CartPage />} />
        <Route path="/favoriler" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}
