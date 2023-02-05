import { NextPage } from 'next';
import { Layout } from '../src/components/layout';
import { Discover } from '../src/components/templates/discover';
import useDataNFTs from '../src/hooks/useDataNFTs';

const DiscoverPage: NextPage = () => {
    const dataNFTs = useDataNFTs();
    
    return (
        <Layout>
            <Discover dataNFTs={dataNFTs} />
        </Layout>
    );
};

export default DiscoverPage;