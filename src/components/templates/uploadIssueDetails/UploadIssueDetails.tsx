import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./UploadIssueDetails.module.sass";
import {Dropdown} from "../../modules/dropdown";
import {Icon} from "../../modules/icon";
import {TextInput} from "../../modules/textInput";
import {TextArea} from "../../modules/textArea";
import {Loader} from "../../modules/loader";
import {Modal} from "../../modules/modal";
import {Preview} from "../../modules/preview";
import {Select} from "../../modules/select";
import {FollowSteps} from "../../modules/followSteps";
import { SelectOption, TRoyaltiesMap } from "./types";
import {useRouter} from 'next/router';
import axios from 'axios';


const royaltiesOptions = ["2%", "5%", "10%"];

// Use number in Solidity smart contracts
const royaltiesMap: TRoyaltiesMap = {
  "2%": 200,
  "5%": 500,
  "10%": 1000,
}

const options = [
  { label: "Music", value: 1 },
  { label: "Movie", value: 2 },
  { label: "University", value: 3 },
  { label: "Education", value: 4 },
  { label: "NLP", value: 5 },
]

const UploadIssueDetails:FC = () => {
  const [title, setTitle] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [tags, setTags] = useState<SelectOption[]>([]);

  const author = "oke";

  const router = useRouter();

  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [royalties, setRoyalties] = useState<string>(royaltiesOptions[0]);
  
  // Used in lighthouse upload
  const [dataUrl, setDataUrl] = useState<string>("");
  const [dataSize, setDataSize] = useState<number>();

  // Used in web3 storage metadata upload
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  
  // const handleCreateItem = async () => {
  //   setVisibleModal(true);
  //   const metadataUrl = await storeMetadata(
  //     dataName, 
  //     dataContext, 
  //     dataContains, 
  //     sources, 
  //     tags,
  //     thumbnailUrl
  //   );
  //   console.log('Store metadata with url', metadataUrl);
  //   if (metadataUrl) {
  //     setMetadataUrl(metadataUrl);
  //   }
  // }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = {
        title, 
        requirements, 
        criteria, 
        tags
      } 
      console.log(data);
      const res = await axios.post('/api/issues', data)
      console.log("upload successfully", res);
      router.push('/issues')
    } catch (err) {
      console.log("errr",err);
    }
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create issue collectible
              </div>
            </div>
            <form className={styles.form} onSubmit={submitData}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Issue Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Issue name"
                      name="Item"
                      type="text"
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      required
                      value={title}
                      onChange={(e: any) => setTitle(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="Requirements"
                      name="Requirements"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      required
                      value={requirements}
                      onChange={(e: any) => setRequirements(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="Criteria"
                      name="Criteria"
                      type="text"
                      placeholder="e. g. “abc”"
                      required
                      value={criteria}
                      onChange={(e: any) => setCriteria(e.target.value)}
                    />
                    <div className={styles.field}>
                      <div className={styles.label}>Tags</div>
                      <Select
                        multiple
                        options={options}
                        value={tags}
                        onChange={o => { 
                          setTags(o)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => setVisiblePreview(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  className={cn("button", styles.button)}
                  // onClick={async () => { 
                  //   await handleCreateItem();
                  // }}
                  type="submit"
                >
                  <span>Create Issue</span>
                  <Icon name="arrow-next" size="10" />
                </button>
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            dataName = {title}
            price = {price}
            thumbnailUrl = {thumbnailUrl}
            dataSize = {dataSize}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FollowSteps
          className={styles.steps}
          dataUrl={dataUrl}
          metadata={metadataUrl}
          feeNumerator={royaltiesMap[royalties]}
          price={Number(price)}
        />
      </Modal>
    </>
  );
};

export default UploadIssueDetails;
