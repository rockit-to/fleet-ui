// Public API of the stays feature — pages should only import from here,
// never reach into features/stays/components/* or features/stays/hooks/*
// directly. Keeps the feature's internals free to change without breaking
// every page that consumes it.
export { default as StaysMain } from "./components/Main";
export { default as StaysWork } from "./components/Work";
export { default as StaysView } from "./components/View";
export { default as StaysCatalog } from "./components/Catalog";
export { default as StaysCard } from "./components/StaysCard";
export { default as StaysCategoryMain } from "./components/CategoryMain";
export { default as StaysCategoryCatalog } from "./components/CategoryCatalog";
export { default as StaysProductDescription } from "./components/ProductDescription";
export { default as StaysCheckoutSlider } from "./components/CheckoutSlider";

export { useBrowse } from "./hooks/useBrowse";
export { useCategories } from "./hooks/useCategories";
export { useCatalog } from "./hooks/useCatalog";
export { useStaysList } from "./hooks/useStaysList";
export { useBooking } from "./booking/BookingContext";
