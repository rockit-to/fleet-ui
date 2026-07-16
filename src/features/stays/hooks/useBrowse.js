import { useEffect, useState } from "react";
import { getBrowse } from "../api/staysApi";

export function useBrowse() {
  const [data, setData] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getBrowse()
      .then((result) => {
        if (!cancelled) setData(result);
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

  return { data, loading, error, reload: () => setRequestId((id) => id + 1) };
}
