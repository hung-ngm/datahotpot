import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';
import { TNFTItem } from '../../../types/NFTItem';

export const resellDataNFT = async (
    nft: TNFTItem,
    newPrice: number,
) : Promise<boolean> => {
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

        console.log('nft to sell', nft);
        console.log('new price', newPrice);

        const transaction = await datahotpotMarketplace.putItemToResell(nft.contract, nft.itemId, newPrice,
            {
                gasLimit: 40000000,
                gasPrice: ethers.utils.parseUnits("50", "gwei"),
                value: ethers.utils.parseUnits("0.001", "ether"),
            }
        );
        const response = await transaction.wait();
        console.log(response);
        return true;
        
    } catch (e: any){
        console.log(e);
        return false;
    }

}