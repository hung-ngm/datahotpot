/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Login.module.sass";
import { Icon } from "../../modules/icon";
import { WalletIcon } from "../../modules/walletIcon";
import { Checkbox } from "../../modules/checkbox";

const menu = [
  {
    title: "MetaMask",
    color: "#F7E1C2",
  },
  {
    title: "Coinbase Wallet",
    color: "#3772FF",
  },
];

const Connect = () => {
  const [age, setAge] = useState(true);
  const [conditions, setConditions] = useState(false);

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link className={styles.back} href="/">
            <Icon name="arrow-prev" size="24" />
            <div className={cn("h2", styles.stage)}>Connect your wallet</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.menu}>
            {menu.map((x, index) => (
              <div
                className={cn({ [styles.active]: index === 1 }, styles.link)}
                key={index}
              >
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <WalletIcon name="metamask" size="40" fill={x.color} />
                  <Icon name="check" size="18" fill={x.color} />
                </div>
                <span>{x.title}</span>
                <div className={styles.arrow}>
                  <Icon name="arrow-next" size="14" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>
            <div className={styles.bg}>
              <img
                srcSet="/images/content/connect-bg@2x.jpg 2x"
                src="/images/content/connect-bg.jpg"
                alt="Connect wallet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;