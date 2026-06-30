const SESSION_KEY = 'oku-getir-demo-session';
const USERS_REGISTRY_KEY = 'oku-getir-demo-users';
export const AUTH_CHANGE_EVENT = 'oku-getir-auth-change';

/** E-posta → kullanıcı adı (seed demo hesaplar) */
const DEMO_USERS: Record<string, string> = {
  'ayse.yilmaz@example.com': 'Ayşe Yılmaz',
  'mehmet.demo@example.com': 'Mehmet Demir',
};

/** E-posta → kullanıcı id (seed demo hesaplar) */
const DEMO_USER_IDS: Record<string, string> = {
  'ayse.yilmaz@example.com': 'a1000001-0000-4000-8000-000000000001',
  'mehmet.demo@example.com': 'b2000001-0000-4000-8000-000000000002',
};

export const DEMO_ACCOUNTS = [
  { email: 'ayse.yilmaz@example.com', password: 'demo123', name: 'Ayşe Yılmaz' },
  { email: 'mehmet.demo@example.com', password: 'demo123', name: 'Mehmet Demir' },
] as const;

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type AuthResult = { ok: true; userId?: string } | { ok: false; error: string };

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function readRegistry(): RegisteredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RegisteredUser[];
  } catch {
    return [];
  }
}

function writeRegistry(users: RegisteredUser[]): void {
  localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(users));
}

function findRegisteredUserByEmail(email: string): RegisteredUser | undefined {
  const normalized = normalizeEmail(email);
  return readRegistry().find((user) => user.email === normalized);
}

function findRegisteredUserById(userId: string): RegisteredUser | undefined {
  return readRegistry().find((user) => user.id === userId);
}

export function getDemoSessionEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export function getDemoUserId(): string | null {
  const email = getDemoSessionEmail();
  if (!email) return null;
  if (DEMO_USER_IDS[email]) return DEMO_USER_IDS[email];
  return findRegisteredUserByEmail(email)?.id ?? null;
}

export function getDemoSessionName(): string | null {
  const email = getDemoSessionEmail();
  if (!email) return null;
  if (DEMO_USERS[email]) return DEMO_USERS[email];
  return findRegisteredUserByEmail(email)?.name ?? email.split('@')[0];
}

export function isDemoAccount(email: string): boolean {
  return normalizeEmail(email) in DEMO_USER_IDS;
}

export function isEmailTaken(email: string): boolean {
  const normalized = normalizeEmail(email);
  return normalized in DEMO_USER_IDS || Boolean(findRegisteredUserByEmail(normalized));
}

export function setDemoSession(email: string): void {
  localStorage.setItem(SESSION_KEY, normalizeEmail(email));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearDemoSession(): void {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function registerDemoUser(name: string, email: string, password: string): AuthResult {
  const trimmedName = name.trim();
  const normalizedEmail = normalizeEmail(email);

  if (trimmedName.length < 2) {
    return { ok: false, error: 'Ad soyad en az 2 karakter olmalıdır.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { ok: false, error: 'Geçerli bir e-posta adresi girin.' };
  }

  if (password.length < 4) {
    return { ok: false, error: 'Şifre en az 4 karakter olmalıdır.' };
  }

  if (isEmailTaken(normalizedEmail)) {
    return { ok: false, error: 'Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin.' };
  }

  const user: RegisteredUser = {
    id: crypto.randomUUID(),
    name: trimmedName,
    email: normalizedEmail,
    password,
  };

  writeRegistry([...readRegistry(), user]);
  setDemoSession(normalizedEmail);

  return { ok: true, userId: user.id };
}

export function loginDemoUser(email: string, password: string): AuthResult {
  const normalizedEmail = normalizeEmail(email);

  if (password.length < 4) {
    return { ok: false, error: 'Şifre en az 4 karakter olmalıdır.' };
  }

  if (isDemoAccount(normalizedEmail)) {
    setDemoSession(normalizedEmail);
    return { ok: true, userId: DEMO_USER_IDS[normalizedEmail] };
  }

  const registered = findRegisteredUserByEmail(normalizedEmail);
  if (registered) {
    if (registered.password !== password) {
      return { ok: false, error: 'E-posta veya şifre hatalı.' };
    }
    setDemoSession(normalizedEmail);
    return { ok: true, userId: registered.id };
  }

  return {
    ok: false,
    error: 'Bu e-posta ile kayıtlı hesap bulunamadı. Kayıt olabilirsiniz.',
  };
}

export function getDemoUserProfileById(
  userId: string,
): { id: string; name: string; email: string } | null {
  const demoEntry = Object.entries(DEMO_USER_IDS).find(([, id]) => id === userId);
  if (demoEntry) {
    const [email, id] = demoEntry;
    return { id, email, name: DEMO_USERS[email] };
  }

  const registered = findRegisteredUserById(userId);
  if (registered) {
    return { id: registered.id, email: registered.email, name: registered.name };
  }

  return null;
}

export function isDemoLoggedIn(): boolean {
  return Boolean(getDemoSessionEmail());
}
