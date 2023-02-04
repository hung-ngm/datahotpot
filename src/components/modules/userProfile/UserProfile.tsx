/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./UserProfile.module.sass";
import {Icon} from "../../modules/icon";
//import {Report} from "../../modules/report";
//import {Modal} from "../../modules/modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import {TUP} from "./types";
import { walletAddressShorterner } from "../../../../utils/walletAddressShorterner";


const UserProfile: FC<TUP> = ({ className, item, user }) => {
  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          <img src="/images/content/avatar-big.jpg" alt="Avatar" />
        </div>
        <div className={styles.name}>{user.name ? user.name : "Unamed"}</div>
        <div className={styles.code}>
          <div className={styles.number}>{walletAddressShorterner(user.address)}</div>
          <button className={styles.copy}>
            <Icon name="copy" size="16" />
          </button>
        </div>
        <div className={styles.info}>
          A wholesome farm owner in Montana. Upcoming gallery solo show in
          Germany
        </div>
        <a
          className={styles.site}
          href="https://ui8.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" size="16" />
          <span>https://ui8.net</span>
        </a>
        <div className={styles.socials}>
          {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))}
        </div>
        <div className={styles.note}>Member since Jan 1, 2023</div>
      </div>
      {/* <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal> */}
    </>
  );
};

export default UserProfile;
