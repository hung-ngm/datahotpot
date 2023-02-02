import { useState, useEffect } from 'react';
import { NextPage, GetStaticProps, GetServerSideProps } from 'next';
import { Layout } from '../src/components/layout';
import { Discover } from '../src/components/templates/discover';
import { loadDataNFTs } from './api/contracts/loadDataNFTs';
import { IDiscovery } from '../src/components/templates/discover/types';
import { TNFTItem } from '../types/NFTItem';

const DiscoverPage: NextPage = () => {
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
    


    return (
        <Layout>
            <Discover dataNFTs={dataNFTs} />
        </Layout>
    );
};

export default DiscoverPage;