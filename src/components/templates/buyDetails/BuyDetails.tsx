/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import { CustomLink } from "../../modules/customLink";
import cn from "classnames";
import styles from "./BuyDetails.module.sass";
import {UserItem} from "../../modules/userItem";
// import Control from "./Control";
// import Options from "./Options";
import { buyNFT } from "../../../../pages/api/contracts/buyNFT";
import { TNFTItem } from "../../../../types/NFTItem";
import { TBuyDetails } from "./types";

const navLinks = ["Info", "Owners"];

const users = [
  {
    name: "Raquel Will",
    position: "Owner",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "Selina Mayert",
    position: "Creator",
    avatar: "/images/content/avatar-1.jpg",
  },
];

const BuyDetails: FC<TBuyDetails> = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBuyItem = async (item: TNFTItem) => {
    const res = await buyNFT(item);
    console.log('buy res', res);
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <img
                srcSet={item.thumbnailUrl}
                src={item.thumbnailUrl}
                alt="Item"
              />
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{item.name}</h1>
            <div className={styles.cate}>
              {item.tags.map((tag: string, index: number) => 
                <div key={index} className={cn("status-purple", styles.tag)}>
                  #{tag}
                </div>
              )}
            </div>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {item.price} FIL
              </div>
              <button 
                className={cn("button", styles.button)}
                onClick={async () => { await handleBuyItem(item) }}
              >Purchase Now</button>
            </div>
            <h2 className={cn("h3", styles.title)}>Data Contract</h2>
            <div className={styles.info}>
              <CustomLink className="" href={`https://hyperspace.filfox.info/en/address/${item.contract}`}>
                <button 
                  className={cn("button", styles.button)}
                >
                  View on Filfox
                </button>
              </CustomLink>
            </div>
            <h2 className={cn("h3", styles.title)}>About</h2>
            <div className={styles.info}>
              {item.context}
            </div>
            <h2 className={cn("h3", styles.title)}>Contains</h2>
            <div className={styles.info}>
              {item.contains}
            </div>
            <h2 className={cn("h3", styles.title)}>Sources</h2>
            <div className={styles.info}>
              {item.sources}
            </div>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <UserItem className={styles.users} items={users} />
            {/* <Control className={styles.control} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyDetails;
