import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout } from '../../src/components/layout';
import { BuyDetails } from "../../src/components/templates/buyDetails"
import { TNFTItem } from '../../types/NFTItem';
import { loadSingleDataNFT } from '../api/contracts/loadSingleNFT';

const ItemDetailsPage: NextPage = () => {
    const [item, setItem] = useState<TNFTItem>();
    const router = useRouter();
    const { id } = router.query;

    const loadItem = async () => {
        if (id) {
            const item = await loadSingleDataNFT(Number(id));
            console.log('item', item);
            setItem(item);
        }
    }
    
    useEffect(() => {
        if (item) {
            return;
        }
        loadItem();

    }, [item])

    return (
        <Layout>
            {item && <BuyDetails item={item} />}
        </Layout>
    );
};

export default ItemDetailsPage;
