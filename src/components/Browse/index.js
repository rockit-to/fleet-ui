import React from "react";
import cn from "classnames";
import styles from "./Browse.module.sass";
import Slider from "react-slick";
import Item from "./Item";
import Icon from "../Icon";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const Browse = ({
  classSection,
  headSmall,
  classTitle,
  title,
  info,
  items,
}) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={cn(classSection, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.inner}>
          <div className={cn(styles.head, { [styles.headSmall]: headSmall })}>
            {classTitle === "h2" && (
              <h2 className={cn(classTitle, styles.title)}>{title}</h2>
            )}
            {classTitle === "h4" && (
              <h4 className={cn(classTitle, styles.title)}>{title}</h4>
            )}
            {info && <div className={cn("info", styles.info)}>{info}</div>}
          </div>
          <div className={styles.wrapper}>
            <Slider className="browse-slider" {...settings}>
              {items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
