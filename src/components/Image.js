import React from "react";
import useDarkMode from "use-dark-mode";

const Image = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
  const darkMode = useDarkMode(false, { storageKey: "fleet-theme-v2", global: { matchMedia: () => ({ media: "", matches: false, addListener: () => {}, removeListener: () => {} }), document: window.document } });

  return (
    <img
      className={className}
      srcSet={darkMode.value ? srcSetDark : srcSet}
      src={darkMode.value ? srcDark : src}
      alt={alt}
    />
  );
};

export default Image;
