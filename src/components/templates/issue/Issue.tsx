import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./Issue.module.sass";
import { Icon } from "../../modules/icon";
import { IssueCard } from "../../modules/issueCard";
import { TIssues } from "./types";

const Issue: FC = () => {

  //console.log(issues);
  const [search, setSearch] = useState("");

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Find Your Datasets</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => console.log('a')}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search ..."
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.wrapper}> 
            <div className={styles.arow}>
                <div className={styles.tag}>
                  <Icon name="lightning" size="20" />
                  <div>All Categories</div>
                </div>
                <div>
                    <IssueCard/>
                    <IssueCard/>
                </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Load more</span>
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Issue;
