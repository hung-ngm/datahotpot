import React, {FC, useState, useEffect} from "react";
import cn from "classnames";
import styles from "./FollowSteps.module.sass";
import {Icon} from "../../modules/icon";
import {TF} from "./types"
import { createDataNFT } from "../../../../pages/api/contracts/createDataNFT";
import { mintDataNFT } from "../../../../pages/api/contracts/mintDataNFT";
import { listDataNFT } from "../../../../pages/api/contracts/listDataNFT";
import { Button } from "../button";

const FollowSteps:FC<TF> = ({ 
  className, 
  dataUrl, 
  metadata,
  feeNumerator,
  price 
}) => {
  const [contractLoading, setContractLoading] = useState<boolean>(false);
  const [contractSuccess, setContractSuccess] = useState<boolean>(false);
  const [contractDisabled, setContractDisabled] = useState<boolean>(true);
  const [contractAddress, setContractAddress] = useState<string>("");

  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [mintDisabled, setMintDisabled] = useState<boolean>(true);
  const [mintTokenId, setMintTokenId] = useState<number>();

  const [sellLoading, setSellLoading] = useState<boolean>(false);
  const [sellSuccess, setSellSuccess] = useState<boolean>(false);
  const [sellDisabled, setSellDisabled] = useState<boolean>(true);


  const handleCreateDataContract = async () => {
    setContractLoading(true);
    const res = await createDataNFT(dataUrl, metadata);
    if (res) {
      setContractAddress(res);
      setContractLoading(false);
      setContractSuccess(true);
      setMintDisabled(false);
    } else {
      setContractLoading(false);
      setContractSuccess(false);
    }
  }

  const handleMintDataNFT = async () => {
    setMintLoading(true);
    const res = await mintDataNFT(contractAddress, feeNumerator);
    console.log('mint NFT res', res);
    if (res > 0) {
      setMintTokenId(res);
      setMintLoading(false);
      setMintSuccess(true);
      setSellDisabled(false);
    } else {
      setMintLoading(false);
      setMintSuccess(false);
    }
  }

  // List NFT in the marketplaces
  const handleSellNFT = async () => {
    setSellLoading(true);
    if (mintTokenId) {
      const res = await listDataNFT(contractAddress, mintTokenId, price);
      console.log('list NFT res', res);
      if (res) {
        setSellLoading(false);
        setSellSuccess(true);
      } else {
        setSellLoading(false);
        setSellSuccess(false);
      }
    }
    
  }

  // Useeffect and setButtonDisabled if the metadata is null
  useEffect(() => {
    if (metadata) {
      setContractDisabled(false);
    }
  }, [metadata])

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
              <div className={styles.info}>Create contract</div>
              <div className={styles.text}>Create data contract on the dataset</div>
            </div>
          </div>
          <Button
            loading={contractLoading}
            success={contractSuccess}
            disabled={contractDisabled}
            name="Create"
            onClick={async () => { await handleCreateDataContract() }}
          />
        </div>

        <div className={cn(styles.item)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Mint data NFT</div>
              <div className={styles.text}>Mint NFT of the data contract</div>
            </div>
          </div>
          <Button
            loading={mintLoading}
            success={mintSuccess}
            disabled={mintDisabled}
            name="Mint" 
            onClick={async () => { await handleMintDataNFT() }}
          />
        </div>
        
        <div className={styles.item}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Sign sell order</div>
              <div className={styles.text}>
                Sign sell order using your wallet
              </div>
            </div>
          </div>
          <Button
            loading={sellLoading}
            success={sellSuccess}
            disabled={sellDisabled}
            name="Sell"
            onClick={async () => { await handleSellNFT() }}
          />
        </div>
        
        
      </div>
    </div>
  );
};

export default FollowSteps;
