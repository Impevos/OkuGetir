import { useCallback, useEffect, useRef, useState } from 'react';

export function useActionToast(durationMs = 2500) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showMessage = useCallback(
    (text: string) => {
      setMessage(text);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setMessage(null), durationMs);
    },
    [durationMs],
  );

  return { message, showMessage };
}
