import { useEffect } from "react";
import { useState } from "react";

function getStorageValue(key, initialValue) {
  const storedValue = JSON.parse(localStorage.getItem(key));

  if (storedValue) return storedValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
