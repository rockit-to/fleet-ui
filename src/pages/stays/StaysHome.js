import React from "react";
import Adventure from "../../components/Adventure";
import Travel from "../../components/Travel";
import Live from "../../components/Live";
import Planning from "../../components/Planning";
import Browse from "../../components/Browse";
import Places from "../../components/Places";
import Hosts from "../../components/Hosts";
import Categories from "../../components/Categories";
import {
  StaysMain as Main,
  StaysWork as Work,
  StaysCatalog as Catalog,
  StaysView as View,
  useBrowse,
  useCategories,
} from "../../features/stays";
import AsyncState from "../../features/stays/components/AsyncState";

const StaysHome = () => {
  const { data: browseData, loading: browseLoading, error: browseError, reload: reloadBrowse } = useBrowse();
  const { categories: categories1, loading: categoriesLoading, error: categoriesError, reload: reloadCategories } = useCategories();
  const browse1 = browseData?.browse1 ?? [];

  return (
    <>
      <Main />
      <Adventure />
      <Travel />
      <Work />
      <Live title="Live anywhere" />
      <Catalog />
      <Planning title="Travel to make memories all around the world" />
      <AsyncState loading={browseLoading} error={browseError} onRetry={reloadBrowse} label="property types" />
      {!browseLoading && !browseError && <Browse
        classSection="section"
        classTitle="h2"
        title="Browse by property type"
        info="Let’s go on an adventure"
        items={browse1}
      />}
      <Places
        title="Explore nearby"
        info="10,789 beautiful places to go"
      />
      <Hosts />
      <View />
      <AsyncState loading={categoriesLoading} error={categoriesError} onRetry={reloadCategories} label="stay categories" />
      {!categoriesLoading && !categoriesError && <Categories
        classSection="section"
        title="Browse by category"
        info="Let’s go on an adventure"
        items={categories1}
      />}
    </>
  );
};

export default StaysHome;
