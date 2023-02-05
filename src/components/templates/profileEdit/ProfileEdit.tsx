import React, { FC , useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./ProfileEdit.module.sass";
import {Control} from "../../modules/control";
import {TextInput} from "../../modules/textInput";
import {TextArea} from "../../modules/textArea";
import {Icon} from "../../modules/icon";
import { IProfileEdit } from "./types";
import axios from "axios";

const ProfileEdit: FC<IProfileEdit> = ({ user }) => {
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.bio);
  const [facebook, setFacebook] = useState<string>(user.facebook);
  const [twitter, setTwitter] = useState<string>(user.twitter);
  const [instagram, setInstagram] = useState<string>(user.instagram);

  const router = useRouter();
  const { id } = router.query;

  const breadcrumbs = [
    {
      title: "Profile",
      url: `/profile/${id}`,
    },
    {
      title: "Edit Profile",
    },
  ];

  const handleUpdateProfile = async () => {
    try {
      const data = {
        name,
        bio,
        facebook,
        twitter,
        instagram
      }
  
      const res = await axios.put(`/api/profile-edit/${id}`, data);
      console.log('update profile res', res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Edit profile</h1>
            <div className={styles.info}>
              You can set preferred display name, create{" "}
              <strong>your profile URL</strong> and manage other personal
              settings.
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.user}>
                <div className={styles.avatar}>
                  <img src="/images/content/avatar-1.jpg" alt="Avatar" />
                </div>
                <div className={styles.details}>
                  <div className={styles.stage}>Profile photo</div>
                  <div className={styles.text}>
                    We recommend an image of at least 400x400. Gifs work too{" "}
                    <span role="img" aria-label="hooray">
                      🙌
                    </span>
                  </div>
                  <div className={styles.file}>
                    <button
                      className={cn(
                        "button-stroke button-small",
                        styles.button
                      )}
                    >
                      Upload
                    </button>
                    <input className={styles.load} type="file" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Account info</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="display name"
                      name="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your display name"
                      required
                    />
                    
                    <TextArea
                      className={styles.field}
                      label="Bio"
                      name="Bio"
                      type="text"
                      placeholder="About yourselt in a few words"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Social</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Facebook"
                      name="Facebook"
                      type="text"
                      placeholder="Enter Facebook profile"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      required={false}
                    />
                    <TextInput
                      className={styles.field}
                      label="twitter"
                      name="Twitter"
                      type="text"
                      placeholder="Enter Twitter profile"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      required={false}
                    /> 
                    <TextInput
                      className={styles.field}
                      label="Instagram"
                      name="Instagram"
                      type="text"
                      placeholder="Enter Instagram profile"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      required={false}
                    /> 
                    
                  </div>
                  
                </div>
              </div>
              
              <div className={styles.btns}>
                <button 
                  className={cn("button", styles.button)}
                  onClick={async () => {
                    await handleUpdateProfile();
                  }}
                >
                  Update Profile
                </button>
                <button
                  className={styles.clear}
                  
                >
                  <Icon name="circle-close" size="24" />
                  Clear all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
