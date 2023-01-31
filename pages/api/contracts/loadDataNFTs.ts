import { ethers } from 'ethers';
import axios from 'axios';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';

import DataNFT from '../../../abis/DataNFT.json';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';

export const loadDataNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://api.hyperspace.node.glif.io/rpc/v1");
    const marketContract = new ethers.Contract(
       datahotpotMarketplaceAddress, 
       DatahotpotMarketplace.abi, 
       provider
    );
    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(data.map(async (i: any) => {
        // const tokenUriString = await tokenContract.tokenURI(i.tokenId);
        // const tokenUri : TokenUri = getURI(tokenUriString);
        
        const nftContract = new ethers.Contract(
            i.nftContract,
            DataNFT.abi,
            provider
        )

        const metadataUrl = await nftContract.getMetadata();
        // Fetch the metadataUrl
        const metadata = await axios.get(metadataUrl);

        console.log('metadata', metadata);
        const wei = ethers.utils.formatUnits(i.price.toString(), 'wei');
        const item = {
            price: (Number(wei)).toString(),
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            name: metadata.data.name,
            context: metadata.data.context,
            contains: metadata.data.contains,
            sources: metadata.data.sources,
            tags: metadata.data.tags,
            itemId: i.itemId.toNumber(),
        }
        return item
    }))
    return items;
}