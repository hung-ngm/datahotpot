import { ethers } from 'ethers'
import Web3Modal from 'web3modal';
import { datahotpotMarketplaceAddress } from '../../../utils/addresses';
import DataNFT from '../../../abis/DataNFT.json';
import { applyAccessConditions } from '../lighthouse/accessControl';

export const createDataNFT = async (
    dataUrl: string, 
    metadata: string, 
) : Promise<string> => {
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
        console.log('Contract deployed to address', dataContract.address);

        // https://files.lighthouse.storage/viewFile/QmYAo4BCHfbf8g2Mkk5B8Q4jEyN8TZzKY3bg1A4TabcRrY
        // Split the string get only after the viewFile/
        const cid = dataUrl.split("viewFile/")[1];
        console.log('cid is', cid);
        
        // After deployed contract, set access control
        const accessControlRes = await applyAccessConditions(cid, dataContract.address);
        console.log('accessControlRes', accessControlRes);
        
        return dataContract.address;
    } catch (err) {
        console.log(err);
        return "";
    }
}