import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Layout } from '../../src/components/layout';
import { SellDetails } from "../../src/components/templates/sellDetails"
import { TNFTItem } from '../../types/NFTItem';
import { loadSingleDataNFT } from '../api/contracts/loadSingleNFT';

const SellDetailsPage: NextPage = () => {
    const [item, setItem] = useState<TNFTItem>();
    const router = useRouter();
    const { id } = router.query;
    console.log('id sell details is', id);

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
            {item && <SellDetails item={item} />}
        </Layout>
    );
};

export default SellDetailsPage;