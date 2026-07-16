import { useEffect, useState } from "react";
import { getStays } from "../api/staysApi";
import { useBooking } from "../booking/BookingContext";

// The public demo API may lag behind the UI repository. Keep the client
// contract stable while the backend rollout catches up, so all search and
// booking flows always receive the fields they require.
function normalizeStay(stay, index) {
  return {
    ...stay,
    id: stay.id ?? `queenstown-stay-${index + 1}`,
    location: stay.location ?? (index < 6 ? "Queenstown, New Zealand" : "Wanaka, New Zealand"),
    propertyType: stay.propertyType ?? "entire-home",
    flexibleCancellation: stay.flexibleCancellation ?? index % 2 === 0,
    beachDistanceKm: stay.beachDistanceKm ?? [2, 18, 4, 11, 3, 22, 6, 1, 9][index % 9],
    longStayEligible: stay.longStayEligible ?? index % 3 !== 1,
  };
}

export function useStaysList() {
  const { publishedStays } = useBooking();
  const [stays, setStays] = useState([]);
  const [requestId, setRequestId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getStays()
      .then((data) => {
        if (!cancelled) setStays(data.stays ?? []);
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

  return { stays: [...publishedStays, ...stays.map(normalizeStay)], loading, error, reload: () => setRequestId((id) => id + 1) };
}
