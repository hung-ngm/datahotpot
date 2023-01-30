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
import { SelectOption } from "./types";

const royaltiesOptions = ["2%", "5%", "10%"];

const options = [
  { label: "Music", value: 1 },
  { label: "Movie", value: 2 },
  { label: "University", value: 3 },
  { label: "Education", value: 4 },
  { label: "NLP", value: 5 },
]

const UploadDatasetDetails:FC = () => {
  const [royalties, setRoyalties] = useState(royaltiesOptions[0]);
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState(false);
  const [locking, setLocking] = useState(false);
  const [dataName, setDataName] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const [visiblePreview, setVisiblePreview] = useState(false);

  const [value1, setValue1] = useState<SelectOption[]>([options[0]])

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
                    <input className={styles.load} type="file" />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
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
                    />
                    <TextArea
                      className={styles.field}
                      label="Context"
                      name="Context"
                      type="text"
                      placeholder="e. g. “After purchasing you will able to recived the logo...”"
                      required
                    />
                    <TextArea
                      className={styles.field}
                      label="What it contains (list of files)"
                      name="Contain"
                      type="text"
                      placeholder="e. g. “abc”"
                      required
                    />
                    <TextArea
                      className={styles.field}
                      label="Sources"
                      name="Sources"
                      type="text"
                      placeholder="e. g. “abc”"
                      required
                    />
                    <div className={styles.field}>
                      <div className={styles.label}>Tags</div>
                      <Select
                        multiple
                        options={options}
                        value={value1}
                        onChange={o => setValue1(o)}
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
                          placeholder="e. g. 0.001 ETH"
                          required
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
                  onClick={() => setVisibleModal(true)}
                  // type="button" hide after form customization
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
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FollowSteps className={styles.steps} />
      </Modal>
    </>
  );
};

export default UploadDatasetDetails;
