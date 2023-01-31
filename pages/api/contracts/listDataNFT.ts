import { ethers } from 'ethers'
import Web3Modal from 'web3modal';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DatahotpotMarketplace from '../../../abis/DatahotpotMarketplace.json';

export const listDataNFT = async (
    nftContract: string,
    tokenId: number,
    price: number,
) : Promise<boolean> => {
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
            price,
            {
                gasLimit: 20000000,
                gasPrice: ethers.utils.parseUnits("50", "gwei"),
                value: ethers.utils.parseEther("0.001"),
            }
        )
        const res = await tx.wait();
        console.log('res: ', res);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

}