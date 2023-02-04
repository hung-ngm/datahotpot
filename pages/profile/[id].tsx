/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import axios from 'axios';
import { Layout } from '../../src/components/layout';
import { Profile } from '../../src/components/templates/profile';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { TNFTItem } from '../../types/NFTItem';
import { TUser } from '../../types/user';
import { loadMyDataNFTs } from '.././api/contracts/loadMyDataNFT';

// Extend the built-in session type
declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            uid: string;
        };
    }
  }


const ProfilePage = () => {
    const { data: session } = useSession();
    const [myDataNFTs, setMyDataNFTs] = useState<TNFTItem[]>();
    const [userProfile, setUserProfile] = useState<TUser>();
    const router = useRouter();

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

    const loadUserProfile = async () => {
        const userId = session?.user.uid;
        const userProfile = await axios.get(`/api/profile/${userId}`);
        console.log('userProfile', userProfile);
        setUserProfile(userProfile.data);
    }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
        if (myDataNFTs && userProfile) {
            return;
        }
        loadMyNFTs();
        loadUserProfile();
    }, [myDataNFTs, userProfile])

    
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