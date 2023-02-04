/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { CustomLink } from "../../customLink";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import { Icon } from "../../icon";
import { Theme } from "../../theme";
import { TUser } from "./types";
import { signOut, useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";
import { walletAddressShorterner } from "../../../../../utils/walletAddressShorterner";

const User: FC<TUser> = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const { data: session } = useSession();
  const { disconnect } = useDisconnect();
 
  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {session?.user && (
        <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div>
          <div className={styles.wallet}>
            7.00698 <span className={styles.currency}>ETH</span>
          </div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>Enrico Cole</div>
            <div className={styles.code}>
              <div className={styles.number}>
                {walletAddressShorterner(session.user.name)}
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
                  <div className={styles.price}>4.689 ETH</div>
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
                href={`/profile/${session?.user.uid}`}
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
                href={"/"}
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