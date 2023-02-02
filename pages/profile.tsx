/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { Layout } from '../src/components/layout';
import { Profile } from '../src/components/templates/profile';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { TNFTItem } from '../types/NFTItem';
import { loadMyDataNFTs } from './api/contracts/loadMyDataNFT';

const ProfilePage: NextPage = () => {
    const { data: session } = useSession();
    const [myDataNFTs, setMyDataNFTs] = useState<TNFTItem[]>();

    const loadMyNFTs = async () => {
        if (session?.user) {
            const address = session.user.name;
            if (address) {
                const items = await loadMyDataNFTs(address);
                console.log('my items', items);
                setMyDataNFTs(items);
            }
        }
    }

    useEffect(() => {
        if (myDataNFTs) {
            return;
        }
        loadMyNFTs();
    }, [myDataNFTs])

    return (
        <Layout>
            <Profile myDataNFTs={myDataNFTs} />
        </Layout>
    );
};

export default ProfilePage;