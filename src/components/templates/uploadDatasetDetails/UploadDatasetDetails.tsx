import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./UploadDatasetDetails.module.sass";
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
import { deployEncrypted } from "../../../../utils/lighthouse/upload";
import { storeMetadata, storeDatasetThumbnail } from "../../../../utils/web3Storage/store";


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
  { label: "Medical", value: 6},
  { label: "Tourism", value: 7},
  { label: "Traffic", value: 8},
  { label: "Restaurant", value: 9},
  { label: "Criminal", value: 10},
  { label: "Art", value: 11},
  { label: "NFT", value: 12},
  { label: "Blockchain", value: 13},
  { label: "Stock", value: 14},
  { label: "Business", value: 15},
  { label: "Economy", value: 16},
  { label: "Hollywood", value: 17},
  { label: "Food", value: 18},
  { label: "Car Industry", value: 19},
  { label: "Consumption", value: 20},
  { label: "Gym", value: 21},
  { label: "Fashion", value: 22},
  { label: "Animal", value: 23},
  { label: "Forest", value: 24 },
  { label: "Record", value: 25 },
  { label: "Technology", value: 26 },
  { label: "Big Tech", value: 27 },
  { label: "Marketing", value: 28 },
  { label: "Plants", value: 29 },
  { label: "Inflation", value: 30 },
  { label: "Recession", value: 31 },
  { label: "Employment", value: 32 },
  { label: "Labor", value: 33 },
  { label: "Population", value: 34 },
  { label: "World Cup", value: 35 },
  { label: "Agriculture", value: 36 },
]

const UploadDatasetDetails:FC = () => {
  const [royalties, setRoyalties] = useState<string>(royaltiesOptions[0]);
  const [dataName, setDataName] = useState<string>("");
  const [dataContext, setDataContext] = useState<string>("");
  const [dataContains, setDataContains] = useState<string>("");
  const [sources, setSources] = useState<string>("");

  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);

  const [tags, setTags] = useState<SelectOption[]>([])
  const [price, setPrice] = useState<string>("");
  
  // Used in lighthouse upload
  const [dataUrl, setDataUrl] = useState<string>("");
  const [dataSize, setDataSize] = useState<number>();
  const [fileName, setFileName] = useState<string>("");

  // Used in web3 storage metadata upload
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const handleDatasetUploaded = async (e: any) => {
    const res = await deployEncrypted(e);
    console.log(res); 
    const { DataUrl, Size, Name } = res;
    setDataUrl(DataUrl);
    setDataSize(Size);
    setFileName(Name);
  }

  const handleThumbnailUploaded = async (e: any) => {
    const datasetThumbnailUrl = await storeDatasetThumbnail(e);
    console.log('Store dataset thumbnail with url', datasetThumbnailUrl);
    if (datasetThumbnailUrl) {
      setThumbnailUrl(datasetThumbnailUrl);
    }
  }
  
  const handleCreateItem = async () => {
    setVisibleModal(true);
    if (dataSize) {
      const metadataUrl = await storeMetadata(
        dataName, 
        dataContext, 
        dataContains, 
        sources, 
        tags,
        thumbnailUrl,
        fileName,
        dataSize
      );
      console.log('Store metadata with url', metadataUrl);
      if (metadataUrl) {
        setMetadataUrl(metadataUrl);
      }
    }
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create dataset collectible
              </div>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input 
                      onChange={async (e) => { 
                        await handleDatasetUploaded(e);
                      }}
                      className={styles.load} 
                      type="file" 
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      CSV, JSON, ... Max 1Gb.
                    </div>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Add dataset thumbnail</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input 
                      onChange={async (e: any) => { 
                        await handleThumbnailUploaded(e);
                      }}
                      className={styles.load} 
                      type="file" 
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, JPEG
                    </div>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.category}>Dataset Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Dataset name"
                      name="Item"
                      type="text"
                      placeholder='e. g. Redeemable Bitcoin Card with logo"'
                      required
                      value={dataName}
                      onChange={(e: any) => setDataName(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="Context"
                      name="Context"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      required
                      value={dataContext}
                      onChange={(e: any) => setDataContext(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="What it contains (list of files)"
                      name="Contain"
                      type="text"
                      placeholder="e. g. “abc”"
                      required
                      value={dataContains}
                      onChange={(e: any) => setDataContains(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="Sources"
                      name="Sources"
                      type="text"
                      placeholder="e. g. “abc”"
                      required
                      value={sources}
                      onChange={(e: any) => setSources(e.target.value)}
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
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Royalties</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={royalties}
                            setValue={setRoyalties}
                            options={royaltiesOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Price"
                          name="Price"
                          type="text"
                          placeholder="e.g. 0.001 FIL"
                          required
                          value={price}
                          onChange={(e: any) => setPrice(e.target.value)}
                        />
                      </div>
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
                  onClick={async () => { 
                    await handleCreateItem();
                  }}
                  type="button"
                >
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            dataName = {dataName}
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

export default UploadDatasetDetails;
