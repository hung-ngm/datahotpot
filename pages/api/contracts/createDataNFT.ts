import { ethers } from 'ethers'
import Web3Modal from 'web3modal';

import { datahotpotMarketplaceAddress } from '../../../utils/addresses';

import DataNFT from '../../../abis/DataNFT.json';

import { mintDataNFT } from './mintDataNFT';

export const createDataNFT = async (dataUrl: string, metadata: string, feeNumerator: number) => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        
        const factory = new ethers.ContractFactory(
            DataNFT.abi, 
            DataNFT.bytecode,
            signer
        );

        // Deploy the data contract
        const dataContract = await factory.deploy(
            datahotpotMarketplaceAddress,
            dataUrl,
            metadata
        );
        await dataContract.deployed();
        console.log('Contract deployed to address', dataContract.address)
        
        // Then mint the 1st NFT to the owner
        const minted = await mintDataNFT(dataContract.address, feeNumerator);
        console.log('minted: ', minted);

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}