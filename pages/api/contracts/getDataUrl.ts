import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import DataNFT from '../../../abis/DataNFT.json';
import { TNFTItem } from '../../../types/NFTItem';

export const getDataUrl = async (nft: TNFTItem) : Promise<string> => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const dataNFTContract = new ethers.Contract(
            nft.contract,
            DataNFT.abi, 
            signer
        );
        
        const dataUrl = await dataNFTContract.getDataUrl(nft.tokenId);
        console.log(dataUrl);
        return dataUrl;
    } catch (err) {
        console.log(err);
        return '';
    }
}