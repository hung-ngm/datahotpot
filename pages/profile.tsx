/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { Layout } from '../src/components/layout';
import { Profile } from '../src/components/templates/profile';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { TNFTItem } from '../types/NFTItem';
import { TUser } from '../types/user';
import { loadMyDataNFTs } from './api/contracts/loadMyDataNFT';

const ProfilePage = () => {
    const { data: session } = useSession();
    const [myDataNFTs, setMyDataNFTs] = useState<TNFTItem[]>();
    const [userProfile, setUserProfile] = useState<TUser>();

    const loadMyNFTs = async () => {
        if (session?.user) {
            const address = session.user.name;
            
            if (address) {
                const currentUser: TUser = {
                    address: address,
                    image: session.user.image,
                }
                setUserProfile(currentUser);
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
        (session?.user && userProfile) && (
            <Layout>
                <Profile 
                    myDataNFTs={myDataNFTs} 
                    user={userProfile}
                />
            </Layout>
        )
    );
};

export default ProfilePage;