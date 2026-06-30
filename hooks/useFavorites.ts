import { useCallback, useEffect, useState } from 'react';
import { ensureDemoUserInSupabase } from '../lib/ensureDemoUser';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient';
import { DEMO_USER_ID, getDummyStore, updateDummyStore } from '../lib/dummyStore';
import type { Favorite } from '../types/book';
import { getBookById } from './useBooks';
import { AUTH_CHANGE_EVENT, getDemoUserId } from '../src/lib/demoSession';

function mapFavorite(row: Record<string, unknown>): Favorite {
  return {
    id: row.id as string,
    userId: (row.userId as string) ?? (row.user_id as string),
    bookId: (row.bookId as string) ?? (row.book_id as string),
    addedAt: (row.addedAt as string) ?? (row.added_at as string),
  };
}

async function attachBooks(items: Favorite[]): Promise<Favorite[]> {
  return Promise.all(
    items.map(async (item) => ({
      ...item,
      book: (await getBookById(item.bookId)) ?? undefined,
    })),
  );
}

/** Kullanıcının favori kitaplarını getirir */
export async function getFavorites(userId: string = DEMO_USER_ID): Promise<Favorite[]> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) throw new Error(error.message);
    return attachBooks((data ?? []).map(mapFavorite));
  }

  const items = getDummyStore().favorites.filter((f) => f.userId === userId);
  return attachBooks(items);
}

/** Favorilere ekler */
export async function addToFavorite(
  bookId: string,
  userId: string = DEMO_USER_ID,
): Promise<Favorite> {
  const supabase = getSupabaseClient();

  if (supabase) {
    await ensureDemoUserInSupabase(userId);

    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, book_id: bookId })
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        const { data: existing, error: fetchError } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', userId)
          .eq('book_id', bookId)
          .single();

        if (fetchError) throw new Error(fetchError.message);
        return mapFavorite(existing);
      }
      throw new Error(error.message);
    }
    return mapFavorite(data);
  }

  let created!: Favorite;
  updateDummyStore((store) => {
    const exists = store.favorites.some(
      (f) => f.userId === userId && f.bookId === bookId,
    );
    if (exists) {
      created = store.favorites.find(
        (f) => f.userId === userId && f.bookId === bookId,
      )!;
      return;
    }
    created = {
      id: crypto.randomUUID(),
      userId,
      bookId,
      addedAt: new Date().toISOString(),
    };
    store.favorites.push(created);
  });
  return created;
}

/** Favorilerden çıkarır */
export async function removeFromFavorite(
  bookId: string,
  userId: string = DEMO_USER_ID,
): Promise<void> {
  const supabase = getSupabaseClient();

  if (supabase) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('book_id', bookId);

    if (error) throw new Error(error.message);
    return;
  }

  updateDummyStore((store) => {
    store.favorites = store.favorites.filter(
      (f) => !(f.userId === userId && f.bookId === bookId),
    );
  });
}

/** React bileşenlerinde kullanım — giriş yapan kullanıcının favorileri */
export function useFavorites(explicitUserId?: string) {
  const [sessionUserId, setSessionUserId] = useState<string | null>(() =>
    typeof window !== 'undefined' ? getDemoUserId() : null,
  );
  const userId = explicitUserId ?? sessionUserId;
  const loggedIn = Boolean(userId);

  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = () => setSessionUserId(getDemoUserId());
    syncUser();
    window.addEventListener(AUTH_CHANGE_EVENT, syncUser);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, syncUser);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) {
        setFavorites([]);
        return;
      }
      setFavorites(await getFavorites(userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Favoriler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const ensureUser = () => {
    if (!userId) {
      throw new Error('Favoriler için giriş yapmalısınız.');
    }
    return userId;
  };

  const add = useCallback(
    async (bookId: string) => {
      const id = ensureUser();
      await addToFavorite(bookId, id);
      await load();
    },
    [userId, load],
  );

  const remove = useCallback(
    async (bookId: string) => {
      const id = ensureUser();
      await removeFromFavorite(bookId, id);
      await load();
    },
    [userId, load],
  );

  const isFavorite = useCallback(
    (bookId: string) => (userId ? favorites.some((f) => f.bookId === bookId) : false),
    [favorites, userId],
  );

  return {
    favorites,
    loading,
    error,
    loggedIn,
    userId,
    addToFavorite: add,
    removeFromFavorite: remove,
    isFavorite,
    reload: load,
    usingSupabase: isSupabaseConfigured,
  };
}
