/**
 * Supabase setup SQL runner — DATABASE_URL gerekir.
 * Kullanım:
 *   set DATABASE_URL=postgresql://postgres.nakbtmsafmbishqwiwqy:SIFRE@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
 *   node scripts/run-supabase-setup.mjs
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlPath = join(__dirname, '..', 'supabase-setup.sql');
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL eksik. Supabase → Project Settings → Database → Connection string (URI)');
  process.exit(1);
}

const sql = readFileSync(sqlPath, 'utf8');
const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log('OK: supabase-setup.sql calistirildi.');
  const { rows } = await client.query('SELECT COUNT(*)::int AS n FROM public.books');
  console.log('Kitap sayisi:', rows[0].n);
} catch (err) {
  console.error('HATA:', err.message);
  process.exit(1);
} finally {
  await client.end();
}
