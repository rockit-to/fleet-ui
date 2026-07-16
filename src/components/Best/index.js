import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Best.module.sass";
import Slider from "react-slick";
import Item from "./Item";
import Icon from "../Icon";
import { apiGet } from "../../lib/apiClient";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Best = ({ classSection, title, info }) => {
  const [best, setBest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiGet("/api/fleet/best").then((data) => { if (!cancelled) setBest(data); }).catch((err) => { if (!cancelled) setError(err); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [requestId]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 100000,
        settings: "unslick",
      },
    ],
  };

  return (
    <div className={cn("section", classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <h2 className={cn("h2", styles.title)}>{title}</h2>
            <div className={cn("info", styles.info)}>{info}</div>
          </div>
          <div className={styles.wrapper}>
            {loading && <p>Loading superhosts…</p>}
            {error && <><p>We could not load superhosts.</p><button className="button-stroke" type="button" onClick={() => setRequestId((id) => id + 1)}>Try again</button></>}
            {!loading && !error && best.length === 0 && <p>No superhosts are available.</p>}
            {!loading && !error && best.length > 0 &&
            <Slider className={cn("best-slider", styles.slider)} {...settings}>
              {best.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
            </Slider>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Best;
