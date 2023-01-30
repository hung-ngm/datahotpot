import React, { FC, useState } from 'react';
import cn from "classnames";
import styles from "./Header.module.sass";
import { User } from "./user";
import { CustomLink } from '../customLink';
import { Image } from "../image";
import { Icon } from "../icon";
import { Dropdown } from '../dropdown';

const nav = [
    {
      url: "/discover",
      title: "Discover",
    },
    {
      url: "/issues",
      title: "Issues",
    },
    // {
    //   url: "/create/dataset",
    //   title: "Create",
    // },
    // {
    //   url: "/profile",
    //   title: "Profile",
    // },
];

const Header: FC = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const uploadTypeOptions = ["Dataset", "Issue"];
  const [uploadType, setUploadType] = useState(uploadTypeOptions[0]);

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    alert();
  };

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <CustomLink className={styles.logo} href="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Datahotpot"
          />
        </CustomLink>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <CustomLink
                className={styles.link}
                //activeClassName={styles.active}
                href={x.url}
                key={index}
              >
                {x.title}
              </CustomLink>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
        </div>
        <CustomLink
          className={cn("button-small", styles.button)}
          href="/upload-variants"
        >
          Upload
        </CustomLink>
        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}
        <User className={styles.user} />
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
}

export default Header;