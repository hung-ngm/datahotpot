/* eslint-disable @next/next/no-img-element */
import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./IssueDetails.module.sass";
import {UserItem} from "../../modules/userItem";
import { IIssueDetails } from "./types";
import useUserByUid from "../../../hooks/useUserByUid";


const navLinks = ["By"];

const IssueDetails: FC<IIssueDetails> = ({ issue }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const author = useUserByUid(issue.authorId);

  const users = [
    {
      name: author?.name || "Unknown",
      position: "Author",
      avatar: author?.avatar || "/images/content/avatar-2.jpg",
    },
  ];


  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{issue.title}</h1>
            <div className={styles.cate}>
              {issue.categories.map((category: any, index: number) => 
                <div key={index} className={cn("status-purple", styles.tag)}>
                  #{category.name}
                </div>
              )}
            </div>

            <h2 className={cn("h3", styles.title)}>Requirements</h2>
            <div className={styles.info}>
              {issue.requirements}
            </div>
            <h2 className={cn("h3", styles.title)}>Criteria</h2>
            <div className={styles.info}>
              {issue.criteria}
            </div>

            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div>
            <UserItem className={styles.users} items={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueDetails;