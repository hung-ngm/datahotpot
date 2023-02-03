import { ethers } from 'ethers';
import axios from 'axios';
import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DataNFT from '../../../abis/DataNFT.json';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';
import { TNFTItem } from '../../../types/NFTItem';

export const loadSingleDataNFT = async (id: number): Promise<TNFTItem> => {
    const provider = new ethers.providers.JsonRpcProvider("https://api.hyperspace.node.glif.io/rpc/v1");
    const marketContract = new ethers.Contract(
       datahotpotMarketplaceAddress, 
       DatahotpotMarketplace.abi, 
       provider
    );

    const item = await marketContract.fetchSingleItem(id);

    const nftContract = new ethers.Contract(
        item.nftContract,
        DataNFT.abi,
        provider
    );

    const metadataUrl = await nftContract.getMetadata();
    // Fetch the metadataUrl
    const metadata = await axios.get(metadataUrl);
    const wei = ethers.utils.formatUnits(item.price.toString(), 'wei');

    const singleItem = {
        contract: item.nftContract,
        price: (Number(wei)).toString(),
        tokenId: item.tokenId.toNumber(),
        seller: item.seller,
        owner: item.owner,
        name: metadata.data.name,
        context: metadata.data.context,
        contains: metadata.data.contains,
        sources: metadata.data.sources,
        tags: metadata.data.tags,
        itemId: item.itemId.toNumber(),
    }

    return singleItem;
}