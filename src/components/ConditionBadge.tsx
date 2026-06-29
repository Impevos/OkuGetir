import type { BookCondition } from '../types/book';

const config: Record<BookCondition, { label: string; className: string }> = {
  yeni: { label: 'Yeni', className: 'bg-green-100 text-green-700' },
  iyi: { label: 'İyi', className: 'bg-blue-100 text-blue-700' },
  orta: { label: 'Orta', className: 'bg-yellow-100 text-yellow-700' },
};

export default function ConditionBadge({ condition }: { condition: BookCondition }) {
  const { label, className } = config[condition];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
