/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import cn from "classnames";
import styles from "./Player.module.sass";
import { Icon } from "../icon";
import { TPlayer } from "./types";

const Player: FC<TPlayer> = ({ className, item }) => {
  return (
    <div className={cn(styles.player, className)}>
      <div className={styles.preview}>
        <img
          srcSet={item.thumbnailUrl}
          src={item.thumbnailUrl}
          alt="Video preview"
        />
        <div className={styles.control}>
          <button className={cn(styles.button, styles.play)}>
            <Icon name="play" size="24" />
          </button>
          <div className={styles.line}>
            <div className={styles.progress} style={{ width: "20%" }}></div>
          </div>
          <div className={styles.time}>2:20</div>
          <button className={styles.button}>
            <Icon name="volume" size="24" />
          </button>
          <button className={styles.button}>
            <Icon name="full-screen" size="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;