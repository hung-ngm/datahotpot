import { ethers } from 'ethers'
import Web3Modal from 'web3modal';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';

export const sellDataNFT = async (
    nftContract: string,
    tokenId: number,
    price: number,
) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const datahotpotMarketplace = new ethers.Contract(
            datahotpotMarketplaceAddress,
            DatahotpotMarketplace.abi,
            signer
        );

        const tx = await datahotpotMarketplace.createMarketItem(
            nftContract,
            tokenId,
            price
        )
        const res = await tx.wait();
        console.log('res: ', res);
    } catch (err) {
        console.log(err);
    }

}