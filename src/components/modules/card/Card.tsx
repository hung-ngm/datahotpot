/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from "react";
import cn from "classnames";
import { CustomLink } from "../customLink/index";
import {TCard} from './types';
import styles from "./Card.module.sass";
import { Icon } from "../icon";
import Interpunct from "react-interpunct";

const Card: FC<TCard> = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Card" />
        <div className={styles.control}>
          <button className={cn("button-small", styles.button)}>
            <span>Buy</span>
            <Icon name="scatter-up" size="16" />
          </button>
        </div>
      </div>
      <CustomLink className={styles.link} href={item.url}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.price}>{item.price}</div>
          </div>
          <div className={styles.line}/>
        </div>
        <div className={styles.foot}>
            <div className = {styles.line2}>
                <div className={styles.files}>1 file (CSV)</div>
                <Interpunct> </Interpunct>
                <div className={styles.limitSize}>3 MB</div>
            </div>
            <div className={styles.avatar}>
                <img src={item.avatar} alt="Avatar" />
            </div> 
        </div>
      </CustomLink>
    </div>
  );
};

export default Card;
