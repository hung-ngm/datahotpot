import React, {FC} from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import {Icon} from "../icon";
import {TPreview} from "./types";
import Interpunct from "react-interpunct";

const Preview: FC<TPreview> = ({ className, onClose }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet="/images/content/card-pic-6.jpg"
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>Black Golden Tiger</div>
                <div className={styles.price}>2.45 ETH</div>
              </div>
            </div>
            <div className={styles.foot}>
              <div className = {styles.line2}>
                  <div className={styles.files}>1 file (CSV)</div>
                  <Interpunct> </Interpunct>
                  <div className={styles.limitSize}>3 MB</div>
              </div>
              <div className={styles.avatar}>
                  <img src="/images/content/avatar-3.jpg" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Preview;
