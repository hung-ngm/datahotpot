/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import { CustomLink } from "../../modules/customLink";
import cn from "classnames";
import styles from "./SellDetails.module.sass";
import {UserItem} from "../../modules/userItem";
import { TextInput } from "../../modules/textInput";
import { resellDataNFT } from "../../../../pages/api/contracts/sellDataNFT";
import { TNFTItem } from "../../../../types/NFTItem";
import { TSellDetails } from "./types";
import useDataUrl from "../../../hooks/useDataUrl";
import { Button } from "../../modules/button";

const navLinks = ["Owner"];

const SellDetails: FC<TSellDetails> = ({ item }) => {
  console.log('sell details item', item);
  const [activeIndex, setActiveIndex] = useState(0);
  const [price, setPrice] = useState<string>("");
  const [sellLoading, setSellLoading] = useState<boolean>(false);
  const [sellSuccess, setSellSuccess] = useState<boolean>(false);

  const handleSellItem = async (item: TNFTItem) => {
    setSellLoading(true);
    console.log('new price', Number(price))
    const res = await resellDataNFT(item, Number(price));
    console.log('sell res', res);
    if (res) {
      setSellLoading(false);
      setSellSuccess(true);
    } else {
      setSellLoading(false);
      setSellSuccess(false);
    }
  }

  const dataUrl = useDataUrl(item);

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
              <div className={styles.col}>
                <div className={styles.fieldset}>
                  <TextInput
                    className={styles.field}
                    label="Price"
                    name="Price"
                    type="text"
                    placeholder='e.g. 0.001 FIL"'
                    required
                    value={price}
                    onChange={(e: any) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.col}>
                <Button
                  loading={sellLoading}
                  success={sellSuccess}
                  disabled={false}
                  name="Sell now"
                  onClick={async () => { handleSellItem(item) }}
                />
              </div>
    
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
            <h2 className={cn("h3", styles.title)}>Dataset</h2>
            <div className={styles.info}>
              <CustomLink className="" href={dataUrl}>
                <button
                  className={cn("button", styles.button)}
                >
                  View Dataset
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
            
          </div>
        </div>
      </div>
    </>
  );
};

export default SellDetails;