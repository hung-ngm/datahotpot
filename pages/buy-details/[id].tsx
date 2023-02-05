import { NextPage } from 'next';
import { Layout } from '../../src/components/layout';
import { BuyDetails } from "../../src/components/templates/buyDetails"
import useSingleDataNFT from '../../src/hooks/useSingleDataNFT';

const BuyDetailsPage: NextPage = () => {
    const item = useSingleDataNFT();
    return (
        <Layout>
            {item && <BuyDetails item={item} />}
        </Layout>
    );
};

export default BuyDetailsPage;
