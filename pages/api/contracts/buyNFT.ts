import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';
import { TNFTItem } from '../../../src/components/templates/discover/types';

export const buyNFT = async (nft: TNFTItem) => {
    try{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const datahotpotMarketplace = new ethers.Contract(
            datahotpotMarketplaceAddress, 
            DatahotpotMarketplace.abi, 
            signer
        );

        const transaction = await datahotpotMarketplace.createMarketSale(nft.contract, Number(nft.itemId), Number(nft.price), {
            value: ethers.utils.parseEther("0.001"),
            gasLimit: 40000000,
            gasPrice: ethers.utils.parseUnits("50", "gwei"),
        });
        const res = await transaction.wait();
        console.log('buy res', res);
        
    }catch (e: any){
        console.log(e);
    }
}