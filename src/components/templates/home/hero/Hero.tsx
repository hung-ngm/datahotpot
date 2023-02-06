/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import cn from "classnames";
import { CustomLink } from "../../../modules/customLink";
import Slider from "react-slick";
import styles from "./Hero.module.sass";
import { Icon } from "../../../modules/icon";
import { Player } from "../../../modules/player";
import { THero } from "./types";
import { TNFTItem } from "../../../../../types/NFTItem";
import useUserByAddress from "../../../../hooks/useUserByAddress";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }: any) => (
    <button {...props}>{children}</button>
);

const Hero: FC<THero> = ({ dataNFTs }) => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        nextArrow: (
            <SlickArrow>
                <Icon name="arrow-next" size="14" />
            </SlickArrow>
        ),
        prevArrow: (
            <SlickArrow>
                <Icon name="arrow-prev" size="14" />
            </SlickArrow>
        ),
    };  

    return (
        <>
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
            <div className={styles.head}>
                <div className={styles.stage}>
                Create, explore, & exchange data NFTs.
                </div>
                <h2 className={cn("h3", styles.title)}>
                The new data economy.
                </h2>
                <CustomLink className={cn("button-stroke", styles.button)} href="/discover">
                Start your search
                </CustomLink>
            </div>
            <div className={styles.wrapper}>
                <Slider className="creative-slider" {...settings}>
                {dataNFTs?.map((x, index) => {
                    const seller = useUserByAddress(x.seller.toLowerCase());
                    return (
                        (
                            <div className={styles.slide} key={index}>
                            <div className={styles.row}>
                                <Player className={styles.player} item={x} />
                                <div className={styles.details}>
                                <div className={cn("h1", styles.subtitle)}>{x.name}</div>
                                <div className={styles.line}>
                                    <div className={styles.item}>
                                    <div className={styles.avatar}>
                                        <img src={seller?.avatar ? seller.avatar: "/images/content/avatar-creator.jpg"} alt="Avatar" />
                                    </div>
                                    <div className={styles.description}>
                                        <div className={styles.category}>Creator</div>
                                        <div className={styles.text}>{seller?.name ? seller.name : "Unknown"}</div>
                                    </div>
                                    </div>
                                    <div className={styles.item}>
                                    <div className={styles.icon}>
                                        <Icon name="stop" size="24" />
                                    </div>
                                    <div className={styles.description}>
                                        <div className={styles.category}>Instant price</div>
                                        <div className={styles.text}>{x.price} FIL</div>
                                    </div>
                                    </div>
                                </div>
        
                                <div className={styles.btns}>
                                    <CustomLink
                                        className={cn("button", styles.button)}
                                        href={`/buy-details/${x.itemId}`}
                                    >
                                        View item
                                    </CustomLink>
                                </div>
                                </div>
                            </div>
                            </div>
                        )
                    )
                })}
                </Slider>
            </div>
            </div>
        </div>
        
        </>
    );
};

export default Hero;