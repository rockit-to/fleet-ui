import { useEffect, useState } from "react";
import { getCategories } from "../api/staysApi";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCategories()
      .then((data) => {
        if (!cancelled) setCategories(data.categories1 ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [requestId]);

  return { categories, loading, error, reload: () => setRequestId((id) => id + 1) };
}
