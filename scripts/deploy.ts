import * as fs from 'fs';
import { ethers } from "hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import * as dotenv from "dotenv";
import { networkConfig, chainsIdConfig } from "../helper-hardhat-config";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const wallet = new ethers.Wallet(PRIVATE_KEY, ethers.provider);

async function main() {
    console.log("Wallet Ethereum Address:", wallet.address);
    const chainId = chainsIdConfig["hyperspace"];
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"];

    //deploy Simplecoin
    const SimpleCoin = await ethers.getContractFactory('SimpleCoin', wallet);
    console.log('Deploying Simplecoin...');
    const simpleCoin = await SimpleCoin.deploy(tokensToBeMinted);
    await simpleCoin.deployed()
    console.log('SimpleCoin deployed to:', simpleCoin.address);


    const config = `
      export const simpleCoinAddress = "${simpleCoin.address}"
    `

    const data = JSON.stringify(config)
    fs.writeFileSync('cache/deploy.ts', JSON.parse(data))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});