import { NextPage } from 'next';
import { Layout } from '../../src/components/layout';
import { SellDetails } from "../../src/components/templates/sellDetails"
import useSingleDataNFT from '../../src/hooks/useSingleDataNFT';

const SellDetailsPage: NextPage = () => {
    const item = useSingleDataNFT();

    return (
        <Layout>
            {item && <SellDetails item={item} />}
        </Layout>
    );
};

export default SellDetailsPage;