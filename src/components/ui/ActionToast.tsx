interface ActionToastProps {
  message: string | null;
}

export function ActionToast({ message }: ActionToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg"
    >
      {message}
    </div>
  );
}
