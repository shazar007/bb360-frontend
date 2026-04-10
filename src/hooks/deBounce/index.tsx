import { useEffect, useState } from "react";

export default function useDebounce<T>(delay = 500, value: T): T {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
}
