import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Testimonials.module.sass";
import Item from "./Item";
import { apiGet } from "../../lib/apiClient";

const Testimonials = ({ classSection }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiGet("/api/fleet/testimonials").then((data) => { if (!cancelled) setTestimonials(data); }).catch((err) => { if (!cancelled) setError(err); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [requestId]);

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        {loading && <p>Loading guest reviews…</p>}
        {error && <><p>We could not load guest reviews.</p><button className="button-stroke" type="button" onClick={() => setRequestId((id) => id + 1)}>Try again</button></>}
        {!loading && !error && testimonials.length === 0 && <p>No guest reviews are available.</p>}
        {!loading && !error && testimonials.length > 0 && <>
        <div className={styles.list}>
          {(testimonials[activeIndex]?.review ?? []).map((x, index) => (
            <Item item={x} key={index} />
          ))}
        </div>
        <div className={styles.nav}>
          {testimonials.map((x, index) => (
            <div
              className={cn(styles.link, {
                [styles.active]: index === activeIndex,
              })}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              <div className={styles.avatar}>
                <img src={x.avatar} alt="Avatar" />
              </div>
              <div className={styles.details}>
                <div className={styles.man}>{x.name}</div>
                <div className={styles.position}>{x.type}</div>
              </div>
            </div>
          ))}
        </div>
        </>}
      </div>
    </div>
  );
};

export default Testimonials;
