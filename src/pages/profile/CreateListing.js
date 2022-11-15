import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers';

import MagicMarketplaceABI from '../../blockchain/abi/MagicMarketplace.json'
import { magicMarketplaceAddress } from "../../blockchain/address"

import formatAddress from "../../utils/formatAddress"

import TitleText from '../../components/nav/TitleText';
import LoadingSpinnerButton from '../../components/buttons/LoadingSpinnerButton';
import BackButton from '../../components/buttons/BackButton';

const CreateListing = ({ nfts }) => {

    const { address, tokenId } = useParams();
    const nft = nfts.find((nft) => (nft.token_address === address) && (nft.token_id === tokenId))
    const [price, setPrice] = useState("")
    const [listing, setListing] = useState(false)

    // // // // // // // //
    // Blockchain Actions
    // // // // // // // //
    async function listNftForSale() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const nftAddress = nft.token_address.toString()
        const tokenId = Number(nft.token_id)
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const nftContract_approveABI = [
            "function approve(address to, uint256 tokenId)"
        ]
        const nftContract = new ethers.Contract(nftAddress, nftContract_approveABI, signer)
        // 1. Approve the nft contract to be listed
        const approveTxn = await nftContract.approve(magicMarketplaceAddress, tokenId)
        await approveTxn.wait()
        // 2. List the nft
        const listPrice = ethers.utils.parseUnits(price)
        const listingTxn = await magicMarketplace.listItemForSale(nftAddress, tokenId, listPrice)
        setListing(true)
        await listingTxn.wait()
        setListing(false)
        console.log('NFT Successfully Listed on the Marketplace.')
    }


  return (
    <div>
        <TitleText title='Create Listing' />
        <div className='p-10 space-y-10'>
            <BackButton toPath={`/profile`} buttonText={'Back to Profile'}/>
            {
                nft &&  
                <div>
                    <div className='flex flex-row space-x-10'>
                        <img className="object-cover rounded-lg w-80 h-80" src={nft.image} alt={nft.token_address} />
                        <div className='space-y-6'>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-blue-500">{nft.name}</div>
                                <div className="font-normal text-gray-500">Contract: {formatAddress(nft.token_address)}</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-700">#{nft.token_id}</div>
                            <div className='flex flex-row space-x-4'>
                                <div class="relative">
                                    <input 
                                    type="text" 
                                    id="price" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)}
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                    placeholder=" " 
                                    style={{}}
                                    />
                                    <label for="price" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Price (ETH)</label>
                                </div>
                                { (listing === false) &&
                                    <button onClick={listNftForSale} className="h-12 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">List NFT for Sale</button>
                                }
                                { (listing === true) &&
                                    <LoadingSpinnerButton text={'Creating Listing...'} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default CreateListing