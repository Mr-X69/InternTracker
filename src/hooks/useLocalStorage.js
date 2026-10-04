import { useState, useEffect } from 'react';

// Custom hook that syncs with localStorage and dispatches/listens to custom window events for cross-component sync
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new CustomEvent('local-storage-sync', { detail: { key, value: valueToStore } }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };
    window.addEventListener('local-storage-sync', handleSync);
    return () => window.removeEventListener('local-storage-sync', handleSync);
  }, [key]);

  return [storedValue || initialValue || [], setValue];
}
