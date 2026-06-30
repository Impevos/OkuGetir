/** Oku Getir veri katmanı — frontend import noktası */
export type {
  Book,
  BookCondition,
  CartItem,
  Category,
  DummyDataStore,
  Favorite,
  User,
} from './types/book';

export { DEMO_USER_ID, getDummyStore, updateDummyStore } from './lib/dummyStore';
export { getSupabaseClient, isSupabaseConfigured } from './lib/supabaseClient';

export {
  getAllBooks,
  getBookById,
  getBooksByCategory,
  useBooks,
} from './hooks/useBooks';

export { getAllCategories, useCategories } from './hooks/useCategories';

export {
  addToCart,
  getCartItems,
  removeFromCart,
  useCart,
} from './hooks/useCart';

export {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
  useFavorites,
} from './hooks/useFavorites';
