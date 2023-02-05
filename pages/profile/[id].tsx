/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { Layout } from '../../src/components/layout';
import { Profile } from '../../src/components/templates/profile';
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { TNFTItem } from '../../types/NFTItem';
import { TUser } from '../../types/user';
import { loadMyDataNFTs } from '.././api/contracts/loadMyDataNFT';
import { prisma } from '../../lib/prismadb';
import { IProfile } from '../../src/components/templates/profile/types';

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

export const getServerSideProps = async ({ params } : any) => {
    const userId = params.id;
    
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (user) {
        return {
            props: {
                user: JSON.parse(JSON.stringify(user))
            }
        }  
    }

    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
}


const ProfilePage: NextPage<IProfile> = ({ user }) => {
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

    // const loadUserProfile = async () => {
    //     const userId = session?.user.uid;
    //     const userProfile = await axios.get(`/api/profile/${userId}`);
    //     console.log('userProfile', userProfile);
    //     setUserProfile(userProfile.data);
    // }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
        if (myDataNFTs && userProfile) {
            return;
        }
        loadMyNFTs();
    }, [myDataNFTs])

    if (session?.user) {
        return (
            <Layout>
                <Profile 
                    myDataNFTs={myDataNFTs} 
                    user={user}
                />
            </Layout>
        )
    }

    return (
        <Layout>
            <div>Loading User Profile ...</div>
        </Layout>
    )

};

export default ProfilePage;