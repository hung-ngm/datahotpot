/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { CustomLink } from "../customLink/index";
//import {TCard} from './types';
import styles from "./IssueCard.module.sass";
import { Icon } from "../icon";
import Interpunct from "react-interpunct";

const IssueCard: FC = () => {
  const item = {
    tags : ['Music', 'Movie', 'NLP']
  }

  return (
    <div>
      <CustomLink className={styles.preview} href="/">
        <div className={styles.body}>
          <div className={styles.line}>
          <div className={styles.title}>ABC</div>
          <div className={styles.details}> The dataset has been acquired from data.gov.in
It shows the number of visitors who visited the central monuments between 2019 and 2021.</div>
          
        
            <div className={styles.foot}>
              <div className = {styles.line2}>
                <div className={styles.author}>Hung Nguyen</div>
                <Interpunct/>
                <div className={styles.updatedAt}>Updated 6 days ago</div>
              </div>
              <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
              </div> 
            </div>
            <div className={styles.tags}>
              {item.tags.map((tag: string, index: number) => 
                <div key={index} className={cn("status-purple", styles.tag)}>
                  #{tag}
                </div>
              )}
            </div>
          </div>
        </div>
      </CustomLink>
    </div>
  );
};

export default IssueCard;
