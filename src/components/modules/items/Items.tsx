import React, {FC} from "react";
import cn from "classnames";
import styles from "./Items.module.sass";
import {Card} from "../card";
import {Loader} from "../loader";
import {TItems} from "./types";

const Items:FC<TItems> = ({ className, items }) => {
  return (
    <div className={cn(styles.items, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <Card className={styles.card} item={x} key={index} />
        ))}
      </div>
      <Loader className={styles.loader} />
    </div>
  );
};

export default Items;
