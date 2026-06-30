import { useCallback, useEffect, useState } from 'react';
import {
  AUTH_CHANGE_EVENT,
  clearDemoSession,
  getDemoSessionEmail,
  getDemoSessionName,
  getDemoUserId,
  isDemoLoggedIn,
} from '../lib/demoSession';

export function useDemoSession() {
  const [loggedIn, setLoggedIn] = useState(isDemoLoggedIn);
  const [email, setEmail] = useState(getDemoSessionEmail);
  const [name, setName] = useState(getDemoSessionName);
  const [userId, setUserId] = useState(getDemoUserId);

  const sync = useCallback(() => {
    setLoggedIn(isDemoLoggedIn());
    setEmail(getDemoSessionEmail());
    setName(getDemoSessionName());
    setUserId(getDemoUserId());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  const logout = useCallback(() => {
    clearDemoSession();
    sync();
  }, [sync]);

  return { loggedIn, email, name, userId, logout };
}
