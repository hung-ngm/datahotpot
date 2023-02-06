/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { CustomLink } from "../../customLink";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import { Icon } from "../../icon";
import { TU } from "./types";
import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";
import { walletAddressShorterner } from "../../../../../utils/walletAddressShorterner";
import useUserProfile from "../../../../hooks/useUserProfile";
import useUserBalance from "../../../../hooks/useUserBalance";
import { getUserBalance } from "../../../../../utils/getUserBalance";

const User: FC<TU> = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const { disconnect } = useDisconnect();
  const userProfile = useUserProfile();
  
  const balance = useUserBalance();
  const balanceShort = getUserBalance(balance);
  
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {userProfile && (
        <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src={userProfile.avatar ? userProfile.avatar : "/images/content/avatar-user.jpg"} alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            {balanceShort} <span className={styles.currency}>FIL</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>{userProfile?.name ? userProfile.name : "Unnamed"}</div>
            <div className={styles.code}>
              <div className={styles.number}>
                {walletAddressShorterner(userProfile.address)}
              </div>
              <button className={styles.copy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/etherium-circle.jpg"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>{balanceShort} FIL</div>
                </div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fund on Coinbase
              </button>
            </div>
            <div className={styles.menu}>
              <CustomLink
                className={styles.item}
                href={`/profile/${userProfile.id}`}
                onClick={() => setVisible(!visible)}
              >
                <div className={styles.icon}>
                  <Icon name="user" size="20" />
                </div>
                <div className={styles.text}>My profile</div>
              </CustomLink>
              
              <a
                className={styles.item}
                style={{ textDecoration: 'none' }}
                href={"/api/auth/signout"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault()
                  disconnect()
                  signOut()
                }}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.text}>Disconnect</div>
              </a>  
            </div>
          </div>
        )}
      </div>
      )}
    </OutsideClickHandler>
  );
};

export default User;