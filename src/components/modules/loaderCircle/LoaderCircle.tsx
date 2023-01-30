import React, {FC} from "react";
import cn from "classnames";
import styles from "./LoaderCircle.module.sass";
import {TL} from "./types"

const LoaderCircle:FC<TL> = ({ className }) => {
  return <div className={cn(styles.loader, className)}></div>;
};

export default LoaderCircle;
