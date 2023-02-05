/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { Layout } from '../../src/components/layout';
import { Profile } from '../../src/components/templates/profile';
import { useSession } from "next-auth/react";
import { prisma } from '../../lib/prismadb';
import { IProfile } from '../../src/components/templates/profile/types';
import useMyDataNFTs from '../../src/hooks/useMyDataNFTs';

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
    const myDataNFTs = useMyDataNFTs();

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