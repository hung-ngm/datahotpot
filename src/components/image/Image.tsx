/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import useDarkMode from "use-dark-mode";
import { TImage } from "./types";


const Image: FC<TImage> = ({ className, src, srcDark, srcSet, srcSetDark, alt }) => {
  const darkMode = useDarkMode(false);

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