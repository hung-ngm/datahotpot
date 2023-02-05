import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TNFTItem } from '../../types/NFTItem';
import { loadDataNFTs } from '../../pages/api/contracts/loadDataNFTs'

const useDataNFTs = () => {
    const { data: session } = useSession();
    const [dataNFTs, setDataNFTs] = useState<TNFTItem[]>();
    const router = useRouter();

    const loadNFTs = async () => {
        const items = await loadDataNFTs();
        console.log('items', items);
        setDataNFTs(items);
    }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
        if (dataNFTs) {
            return;
        }
        loadNFTs();
    }, [dataNFTs])

    return dataNFTs;
}

export default useDataNFTs;