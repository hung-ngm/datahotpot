import { NextPage } from 'next';
import { Layout } from '../../src/components/layout';
import { BuyDetails } from "../../src/components/templates/buyDetails"
import { IBuyDetails } from '../../src/components/templates/buyDetails/types';

const ItemDetailsPage: NextPage<IBuyDetails> = ({ item }) => {
    return (
        <Layout>
            <BuyDetails item={item} />
        </Layout>
    );
};

export default ItemDetailsPage;
