import { NextPage, GetServerSideProps } from 'next';
import { Layout } from '../src/components/layout';
import { Discover } from '../src/components/templates/discover';
import { loadDataNFTs } from './api/contracts/loadDataNFTs';
import { IDiscovery } from '../src/components/templates/discover/types';

const DiscoverPage: NextPage<IDiscovery> = (props) => {
    return (
        <Layout>
            <Discover {...props} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const items = await loadDataNFTs();
  
    return {
      props: {
        dataNFTs: items,
      },
    };
};


export default DiscoverPage;