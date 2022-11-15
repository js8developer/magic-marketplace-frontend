import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers';

import MagicMarketplaceABI  from '../../blockchain/abi/MagicMarketplace.json'
import { magicMarketplaceAddress } from '../../blockchain/address';

import TitleText from '../../components/nav/TitleText';
import formatAddress from '../../utils/formatAddress';
import PriceBox from '../../components/PriceBox';
import LoadingSpinnerButton from '../../components/buttons/LoadingSpinnerButton';
import BackButton from '../../components/buttons/BackButton';

const MarketItemDetails = ({ wallet, marketItems }) => {

    const { itemId } = useParams();
    const nft = marketItems.find((nft) => nft.itemId === itemId)
    const [newPrice, setNewPrice] = useState("")

    const [buying, setBuying] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [deleting, setDeleting] = useState(false)


    // // // // // // // //
    // Blockchain Actions
    // // // // // // // //
    async function buyNFT() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const txn = await magicMarketplace.buyItem(nft.nftAddress, nft.tokenId, { value: nft.price })
        setBuying(true)
        await txn.wait()
        setBuying(false)
        console.log('NFT Successfully Purchased.')
    }

    async function updateListing() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const updatedPrice = ethers.utils.parseEther(newPrice)
        const updatePriceTxn = await magicMarketplace.updateListing(nft.nftAddress, nft.tokenId, updatedPrice)
        setUpdating(true)
        await updatePriceTxn.wait()
        setNewPrice("")
        setUpdating(false)
        console.log("Price Successfully Updated.")
    }

    async function deleteListing() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const cancelListingTxn = await magicMarketplace.cancelListing(nft.nftAddress, nft.tokenId)
        setDeleting(true)
        await cancelListingTxn.wait()
        setDeleting(false)
        console.log("Price Successfully Deleted.")
    }


    


  return (
    <div>
        <TitleText title='NFT Details' />
        <div className='p-10 space-y-10'>
            <BackButton toPath={`/`} buttonText={'Back to Marketplace'}/>
            {
                nft &&  
                <div>
                    <div className='flex flex-row space-x-10'>
                        <img className="object-cover rounded-lg w-80 h-80" src={nft.image} alt={nft.nftAddress} />
                        <div className='space-y-8'>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-indigo-500">{nft.name}</div>
                                <div className="font-normal text-gray-500">Contract: {formatAddress(nft.nftAddress)}</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-700">#{nft.tokenId}</div>
                            <PriceBox price={nft.price} labelText={'Current Price'}/>
                            <div>
                                { (nft.seller.toLowerCase() !== wallet.toLowerCase()) &&
                                    <>
                                    { (buying === false) &&
                                        <button onClick={buyNFT} className="h-12 w-44 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">Buy NFT</button>
                                    }
                                    { (buying === true) &&
                                        <LoadingSpinnerButton text={"Purchasing..."} />
                                    }
                                    </>
                                }
                                { (nft.seller.toLowerCase() === wallet.toLowerCase()) && 
                                    <div className='space-y-4'>
                                        <div className='flex flex-row space-x-4'>
                                            <div class="relative">
                                                <input 
                                                type="text" 
                                                id="newPrice" 
                                                value={newPrice} 
                                                onChange={(e) => setNewPrice(e.target.value)}
                                                class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                                placeholder=" " 
                                                style={{}}
                                                />
                                                <label for="newPrice" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">New Price (ETH)</label>
                                            </div>
                                            <div>
                                                { (updating === false) &&
                                                    <button onClick={updateListing} className="h-12 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Update Listing</button>
                                                }
                                                { (updating === true) &&
                                                    <LoadingSpinnerButton text={'Updating Listing...'} />
                                                }
                                            </div>
                                        </div>
                                        <div>
                                        { (deleting === false) &&
                                            <button onClick={deleteListing} className="h-12 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Delete Listing</button>
                                        }
                                        { (deleting === true) &&
                                            <LoadingSpinnerButton text={'Deleting Listing...'} />
                                        }
                                        </div>
                                    </div>
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

export default MarketItemDetails