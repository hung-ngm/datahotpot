import React, {FC, useState, useEffect} from "react";
import cn from "classnames";
import styles from "./FollowSellSteps.module.sass";
import {Icon} from "../../modules/icon";
import {Loader} from "../../modules/loader";
import {LoaderCircle} from "../loaderCircle";
import {TFollowSellSteps} from "./types"
import { resellDataNFT } from "../../../../pages/api/contracts/sellDataNFT";
import { TNFTItem } from "../../templates/discover/types";

const FollowSteps:FC<TFollowSellSteps> = ({ 
  className, 
}) => {
  const [sellLoading, setSellLoading] = useState<boolean>(false);
  const [sellSuccess, setSellSuccess] = useState<boolean>(false);
  
  const button = (
    loading: boolean, 
    success: boolean, 
    name: string, 
    onClick: (e: any) => void
  ): any => {
    if (loading && !success) {
      return (
        <button className={cn("button loading", styles.button)}>
          <Loader className={styles.loader} color="white" />
        </button>
      )
    } else if (!loading && success) {
      return (
        <button className={cn("button done", styles.button)}>Done</button>
      )
    } 
    else {
      return (
        <button onClick={onClick} className={cn("button", styles.button)}>{name}</button>
      )
    }
  }

  const handleSellNFT = async (nft: TNFTItem, newPrice: number) => {
    try {
      setSellLoading(true);
      const res = await resellDataNFT(nft, newPrice);
      console.log('sell NFT res', res);
      if (res) {
        setSellLoading(false);
        setSellSuccess(true);
      } else {
        setSellLoading(false);
        setSellSuccess(false);
      }

    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>Folow steps</div>
      <div className={styles.list}>
        
        <div className={cn(styles.item)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sell data NFT</div>
              <div className={styles.text}>Sell the data NFT</div>
            </div>
          </div>
          {button(
            sellLoading,
            sellSuccess,
            "Sell", 
            async () => {  }
          )}
        </div>
        
      </div>
    </div>
  );
};

export default FollowSteps;
