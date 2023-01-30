import React, {FC} from "react";
import cn from "classnames";
import styles from "./TextArea.module.sass";
import {TText} from "./types";

const TextArea:FC<TText> = ({ className, label, ...props }) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <textarea className={styles.input} {...props} />
      </div>
    </div>
  );
};

export default TextArea;
