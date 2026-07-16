import React from "react";
import cn from "classnames";
import styles from "./FullPhoto.module.sass";
import Product from "../../components/Product";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useStaysList } from "../../features/stays";

const breakpointCols = {
  default: 2,
  768: 1,
};

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Stays",
    url: "/",
  },
  {
    title: "New Zealand",
    url: "/stays-category",
  },
  {
    title: "South Island",
  },
];

const gallery = [
  "/images/content/photo-2.1.jpg",
  "/images/content/photo-2.2.jpg",
  "/images/content/photo-2.6.jpg",
  "/images/content/photo-2.3.jpg",
  "/images/content/photo-2.7.jpg",
  "/images/content/photo-2.4.jpg",
  "/images/content/photo-2.8.jpg",
  "/images/content/photo-2.5.jpg",
  "/images/content/photo-2.9.jpg",
];

const FullPhoto = () => {
  const { stayId } = useParams();
  const { stays, loading, error, reload } = useStaysList();
  const stay = stays.find((item) => item.id === stayId) ?? stays[0];
  if (loading) return <div className="section">Loading photos…</div>;
  if (error) return <div className="section"><button className="button-stroke" type="button" onClick={reload}>Try again</button></div>;
  if (!stay) return <div className="section">This stay is unavailable.</div>;
  const activeGallery = [stay.src, ...gallery.slice(1)];
  const activeOptions = [{ title: "Superhost", icon: "home" }, { title: stay.location, icon: "flag" }];
  return (
    <>
      <Product
        classSection="section-mb64"
        urlHome={`/stays-product/${stay.id}`}
        title={stay.title}
        breadcrumbs={breadcrumbs}
        options={activeOptions}
      ></Product>
      <div className={cn("section-mb80", styles.section)}>
        <div className={cn("container", styles.container)}>
          {activeGallery.map(
            (x, index) =>
              index === 0 && (
                <div className={styles.preview} key={index}>
                  <img src={x} alt="Nature" />
                </div>
              )
          )}
          <div className={styles.inner}>
            <Masonry
              className={styles.grid}
              columnClassName={styles.column}
              breakpointCols={breakpointCols}
            >
              {activeGallery.map(
                (x, index) =>
                  index > 0 && (
                    <div className={styles.preview} key={index}>
                      <img src={x} alt="Nature" />
                    </div>
                  )
              )}
            </Masonry>
          </div>
          <div className={styles.foot}>
            <Link
              to={`/stays-product/${stay.id}`}
              className={cn("button-circle-stroke button-small", styles.button)}
            >
              <Icon name="close" size="24" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullPhoto;
