import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TNFTItem } from '../../types/NFTItem';
import { loadMyDataNFTs } from '../../pages/api/contracts/loadMyDataNFT';

const useMyDataNFTs = () => {
    const { data: session } = useSession();
    const [myDataNFTs, setMyDataNFTs] = useState<TNFTItem[]>();
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

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
        if (myDataNFTs) {
            return;
        }
        loadMyNFTs();
    }, [myDataNFTs])

    return myDataNFTs;
}

export default useMyDataNFTs;