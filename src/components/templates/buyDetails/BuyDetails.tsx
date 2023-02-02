/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./BuyDetails.module.sass";
import {UserItem} from "../../modules/userItem";
// import Control from "./Control";
// import Options from "./Options";
import { buyNFT } from "../../../../pages/api/contracts/buyNFT";
import {TC} from "../../modules/card/types";
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

  const handleBuyItem = async (item: TC) => {
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
                srcSet="/images/content/item-pic@2x.jpg 2x"
                src="/images/content/item-pic.jpg"
                alt="Item"
              />
            </div>
            {/* <Options className={styles.options} /> */}
          </div>
          <div className={styles.details}>
            {/* <div className={cn("status-stroke-black",styles.topsection)}> */}
            <h1 className={cn("h3", styles.title)}>The amazing art</h1>
            <div className={styles.cate}>
              <div className={cn("status-purple", styles.tag)}>#Music</div>
              <div className={cn("status-purple", styles.tag)}>#Entertainment</div>
              <div className={cn("status-purple", styles.tag)}>#University</div>
              <div className={cn("status-purple", styles.tag)}>#NLP</div>
            </div>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                2.5 ETH
              </div>
              <button 
                className={cn("button", styles.button)}
                onClick={async () => { await handleBuyItem(item) }}
              >Purchase Now</button>
            </div>
            {/* </div> */}
            <h2 className={cn("h3", styles.title)}>About</h2>
            <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit This NFT Card will give you Access to Special Airdrops
              . To learn more about UI8 please visit hfdbfd vdhf hdf fvhdf vdhvdfvfd shv dfvhdf vdhvdfvfd 
              ncv dfjvdjv jdfndbn dhg vdfjvdf vd v vhfdv dfv dfjvdf vjdfv dfvjdf jfdj vjf dfj d
              vhd vdhv fdhv d dv d vdfhvd vdfhvdfvdfvhfdv fd{" "}
            </div>
            <h2 className={cn("h3", styles.title)}>Contains</h2>
            <div className={styles.info}>
              This NFT Card will give you Access to Special Airdrops. To learn
              more about UI8 please visit hfdbfd vdhf hdf fvhdf vdhvdfvfd shv dfvhdf vdhvdfvfd 
              ncv dfjvdjv jdfndbn dhg vdfjvdf vd v vhfdv dfv dfjvdf vjdfv dfvjdf jfdj vjf dfj d
              vhd vdhv fdhv d dv d vdfhvd vdfhvdfvdfvhfdv fd{" "}
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
