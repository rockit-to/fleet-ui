import { useEffect, useState } from "react";
import { getCatalog } from "../api/staysApi";

export function useCatalog() {
  const [catalog, setCatalog] = useState([]);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getCatalog()
      .then((data) => {
        if (!cancelled) setCatalog(data);
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

  return { catalog, loading, error, reload: () => setRequestId((id) => id + 1) };
}
