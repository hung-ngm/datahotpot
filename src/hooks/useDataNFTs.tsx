import { useState, useEffect } from 'react';
import { TNFTItem } from '../../types/NFTItem';
import { loadDataNFTs } from '../../pages/api/contracts/loadDataNFTs'

const useDataNFTs = () => {
    const [dataNFTs, setDataNFTs] = useState<TNFTItem[]>();

    const loadNFTs = async () => {
        const items = await loadDataNFTs();
        console.log('items', items);
        setDataNFTs(items);
    }

    useEffect(() => {
        if (dataNFTs) {
            return;
        }
        loadNFTs();
    }, [dataNFTs])

    return dataNFTs;
}

export default useDataNFTs;