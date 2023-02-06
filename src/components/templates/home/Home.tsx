import React, { FC } from "react";
import { Hero } from "./hero";
import { IHome } from "./types";

const Home: FC<IHome> = ({ dataNFTs }) => {

    return (
        <>
            <Hero dataNFTs={dataNFTs} />
        </>
    );
};

export default Home;