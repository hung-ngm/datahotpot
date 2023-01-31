import { ethers } from 'ethers'
import Web3Modal from 'web3modal';

import DataNFT from '../../../abis/DataNFT.json';

export const mintDataNFT = async (
    nftAddress: string, 
    feeNumerator: number
) : Promise<number> => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        
        const dataNFT = new ethers.Contract(
            nftAddress,
            DataNFT.abi,
            signer
        );

        const tx = await dataNFT.createToken(feeNumerator);
        const resTx = await tx.wait();
        const [transferEvent] = resTx.events;
        const { tokenId } = transferEvent.args;
        console.log('New token id created', tokenId);
        return tokenId.toNumber();

    } catch (err) {
        console.error(err);
        return -1;
    }
}