# Datahotpot Marketplace - FVM Space Warp Hackathon 2023

# Project Description
Introduction Datahotpot is a data exchange platform that empowers individuals and organizations to take control of their data's value. The platform enables users to tokenize their datasets as NFTs (Non-Fungible Tokens) and sell them via the marketplace. This way, data becomes a valuable asset that can be traded and monetised, just like any other collectible item.

## Project Overview (Some features):

3 steps for users to monetize any dataset:
+ Create the data contract
+ Mint the DataNFT (which has access control) that only owners of the NFTs can access the dataset
+ List the NFT via the marketplaces and earn revenue

Sign in with Ethereum account

Share your demand for datasets by uploading issues and publicly share with others

## How it's Made
Datahotpot is a creator platform that incentives the data provider to take ownership of data via NFT and monetise their data. All the actions of creating data contracts, minting DataNFT and listing DataNFT is handled by the Datahotpot's smart contracts. Users can also log in to the platform with Sign In with Ethereum and freely upload their issues as their demand for any datasets

## Tech Stack of the project:

- FrontEnd: NextJS, Typescript, SASS
- BackEnd: Prisma, Supabase
- Smart Contracts: Hardhat, FEVM
- API:
  + Lighthouse API (Sponsorship) for creating data access control NFT
  + web3.storage to upload files to IPFS network
