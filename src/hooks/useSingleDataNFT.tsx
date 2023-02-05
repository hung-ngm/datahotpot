import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TNFTItem } from '../../types/NFTItem';
import { loadSingleDataNFT } from '../../pages/api/contracts/loadSingleNFT'

const useSingleDataNFT = () => {
    const { data: session } = useSession();
    const [item, setItem] = useState<TNFTItem>();
    const router = useRouter();
    const { id } = router.query;
    console.log('router id is', id);

    const loadItem = async () => {
        if (id) {
            const item = await loadSingleDataNFT(Number(id));
            console.log('item', item);
            setItem(item);
        }
    }

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
        if (item) {
            return;
        }
        loadItem();
    }, [item])

    return item;
}

export default useSingleDataNFT;