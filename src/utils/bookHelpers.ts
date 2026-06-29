import type { BookCondition } from '../../types/book';

export const CONDITION_LABELS: Record<BookCondition, string> = {
  yeni: 'Yeni',
  iyi: 'İyi',
  orta: 'Orta',
};

export const CONDITION_STYLES: Record<BookCondition, string> = {
  yeni: 'bg-emerald-100 text-emerald-800',
  iyi: 'bg-sky-100 text-sky-800',
  orta: 'bg-amber-100 text-amber-800',
};

export function formatPrice(amount: number | null): string {
  if (amount == null) return '—';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(amount);
}
