import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import cn from "classnames";
import styles from "./StaysProduct.module.sass";
import Product from "../../components/Product";
import CommentsProduct from "../../components/CommentsProduct";
import Browse from "../../components/Browse";
import Newsletter from "../../components/Newsletter";
import { StaysProductDescription as ProductDescription, useBooking, useBrowse, useStaysList } from "../../features/stays";
import AsyncState from "../../features/stays/components/AsyncState";

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

const parametersUser = [
  {
    title: "Superhost",
    icon: "home",
  },
  {
    title: "256 reviews",
    icon: "star-outline",
  },
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const StaysProductPage = () => {
  const { stayId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();
  const { stays, loading, error, reload: reloadStays } = useStaysList();
  const { data: browseData, loading: browseLoading, error: browseError, reload: reloadBrowse } = useBrowse();
  const browse1 = browseData?.browse1 ?? [];
  const browse2 = browseData?.browse2 ?? [];
  const stay = stays.find((item) => item.id === stayId) ?? (!stayId ? stays[0] : null);
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests")) || 1;

  if (loading) return <div className="section">Loading stay…</div>;
  if (error) return <div className="section"><div className="container"><p>We could not load this stay.</p><button className="button-stroke" type="button" onClick={reloadStays}>Try again</button></div></div>;
  if (!stay) return <div className="section">This stay is no longer available.</div>;

  const gallery = [
    stay.src,
    stay.image || "/images/content/photo-1.2.jpg",
    "/images/content/photo-1.3.jpg",
    "/images/content/photo-1.4.jpg",
  ];
  const options = [
    { title: "Superhost", icon: "home" },
    { title: stay.location, icon: "flag" },
  ];
  const reserve = () => {
    startBooking({
      stayId: stay.id,
      stay,
      checkIn,
      checkOut,
      guests,
    });
    navigate("/stays-checkout");
  };

  return (
    <>
      <Product
        classSection="section-mb64"
        urlHome="/stays-category"
        title={stay.title}
        breadcrumbs={breadcrumbs}
        options={options}
        gallery={gallery}
        type="stays"
        stayId={stay.id}
        rating={stay.rating}
        reviews={stay.reviews}
      />
      <ProductDescription
        classSection="section"
        stay={stay}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        onReserve={reserve}
      />
      <CommentsProduct
        className={cn("section", styles.comment)}
        parametersUser={parametersUser}
        info={stay.description || "Described by Queenstown House & Garden magazine as having 'one of the best views we've ever seen' you will love relaxing in this newly built"}
        socials={socials}
        buttonText="Contact"
      />
      <AsyncState loading={browseLoading} error={browseError} onRetry={reloadBrowse} label="recommended stays" />
      {!browseLoading && !browseError && <Browse
        classSection="section"
        classTitle="h2"
        title="Browse by property type"
        info="Let’s go on an adventure"
        items={browse1}
      />}
      <Newsletter />
      {!browseLoading && !browseError && <Browse
        classSection="section"
        headSmall
        classTitle="h4"
        title="Explore mountains in New Zealand"
        items={browse2}
      />}
    </>
  );
};

export default StaysProductPage;
