/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { CustomLink } from "../customLink/index";
//import {TCard} from './types';
import styles from "./IssueCard.module.sass";
import { Icon } from "../icon";
import Interpunct from "react-interpunct";
import { TIssueCard } from "./types";
import useUserByUid from "../../../hooks/useUserByUid";

const IssueCard: FC<TIssueCard> = ({ issue }) => {
  const tags = issue.categories.map((category) => category.name);
  const author = useUserByUid(issue.authorId);

  return (
    <div>
      <CustomLink className={styles.preview} href={`/issue-details/${issue.id}`}>
        <div className={styles.body}>
          <div className={styles.line}>
          <div className={styles.title}>{issue.title}</div>
          <div className={styles.details}>
            {issue.requirements}
          </div>
        
          <div className={styles.foot}>
            <div className = {styles.line2}>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <img 
                    src={author?.avatar ? author.avatar : "/images/content/avatar-1.jpg" }
                    alt="Avatar" />
                </div> 
              </div>
              <Interpunct/>
              
            </div>
            
          </div>
          <div className={styles.tags}>
            {tags.map((tag: string, index: number) => 
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
