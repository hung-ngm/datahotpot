import React, { useState, FC } from "react";
import cn from "classnames";
import { CustomLink } from "../../modules/customLink";
import styles from "./Profile.module.sass";
import {Icon} from "../../modules/icon";
import {UserProfile} from "../../modules/userProfile";
import {Items} from "../../modules/items";
//import Followers from "./Followers";

// data
import { bids } from "../../mock/bids";
import { IProfile } from "./types";
import { TNFTItem } from "../../../../types/NFTItem";
import { Modal } from "../../modules/modal";
import { TModal } from "../../modules/modal/types";


const navLinks = [
  "On Sale",
  "Purchased",
  "Issues",
  "Likes",
//   "Following",
//   "Followers",
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const following = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "stroke",
    buttonContent: "Unfollow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];

const followers = [
  {
    name: "Sally Fadel",
    counter: "161 followers",
    avatar: "/images/content/avatar-5.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
  {
    name: "Aniya Harber",
    counter: "161 followers",
    avatar: "/images/content/avatar-6.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
    ],
  },
  {
    name: "Edwardo Bea",
    counter: "161 followers",
    avatar: "/images/content/avatar-7.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-4.jpg",
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-6.jpg",
    ],
  },
  {
    name: "Reymundo",
    counter: "161 followers",
    avatar: "/images/content/avatar-8.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-2.jpg",
      "/images/content/follower-pic-6.jpg",
      "/images/content/follower-pic-1.jpg",
    ],
  },
  {
    name: "Jeanette",
    counter: "161 followers",
    avatar: "/images/content/avatar-9.jpg",
    url: "https://ui8.net",
    buttonClass: "blue",
    buttonContent: "Follow",
    gallery: [
      "/images/content/follower-pic-1.jpg",
      "/images/content/follower-pic-3.jpg",
      "/images/content/follower-pic-5.jpg",
      "/images/content/follower-pic-4.jpg",
    ],
  },
];



const Profile: FC<IProfile> = ({ myDataNFTs }) => {
  console.log('myDataNFTs', myDataNFTs);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  
  const [visibleOnSaleModal, setVisibleOnSaleModal] = useState<boolean>(false);
  const [visiblePurchasedModal, setVisiblePurchasedModal] = useState<boolean>(false);

  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <CustomLink
              className={cn("button-stroke button-small", styles.button)}
              href="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </CustomLink>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setVisible(false)}
            >
              Save photo
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <UserProfile className={styles.user} item={socials} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items 
                    className={styles.items} 
                    items={bids.slice(0, 3)} 
                    cardName="Buy"
                  />
                )}
                {(activeIndex === 1 && myDataNFTs) && (
                  <Items 
                    className={styles.items} 
                    items={myDataNFTs.slice(0, 6)} 
                    cardName="Sell"
                  />
                )}
                {activeIndex === 2 && (
                  <></>
                )}
                {activeIndex === 3 && (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
