import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import MagicMarketplaceABI from '../blockchain/abi/MagicMarketplace.json'
import { magicMarketplaceAddress } from "../blockchain/address/MagicMarketplace"
import LoadingSpinnerButton from './buttons/LoadingSpinnerButton'


const Proceeds = ({ wallet, ethPrice, maticPrice }) => {
    
    const [proceeds, setProceeds] = useState(0)
    const [withdrawing, setWithdrawing] = useState(false)

    useEffect(() => {
        async function loadProceeds(){
            await fetchProceeds()
        }
        loadProceeds()
    }, [proceeds])
    

    async function fetchProceeds(){
        console.log("fetch proceeds")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, provider)
        const proceeds = await magicMarketplace.fetchProceeds(wallet)
        const proceedsFormatted = ethers.utils.formatEther(proceeds)
        setProceeds(proceedsFormatted.toString())
        console.log("proceedsFormatted", proceedsFormatted)
    }

    async function withdrawProceeds(){
        console.log("withdrawProceeds")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const withdrawProceedsTxn = await magicMarketplace.withdrawProceeds()
        setWithdrawing(true)
        await withdrawProceedsTxn.wait()
        setProceeds(0)
        setWithdrawing(false)
        console.log("Successfully withdrew proceeds.")
    }

    const priceInUsd = (chain) => {
        const listingPrice = ethers.utils.formatUnits(Number(proceeds))
        let priceInUsd

        if (chain === 'matic') {
            priceInUsd = (Number(maticPrice) * Number(listingPrice))
        } else {
            priceInUsd = (Number(ethPrice) * Number(listingPrice))
        }
        
        return priceInUsd.toFixed(2)
    }

  return (
    <div className='flex flex-row'>
        <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Current Balance</h5>
                {/* <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900">{proceeds} ETH</h5> */}
                <span className='flex flew-row inline-block align-middle space-x-2'>
                    <div className="text-2xl font-bold text-gray-900">${priceInUsd('eth')}</div>
                    <div className="text-md pt-1 font-normal text-gray-400">{proceeds} ETH</div>
                </span>
            </div>
            
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Click below to withdraw your current earnings from the Magic Marketplace</p>
            { (withdrawing === false) &&
                <button href="#" onClick={withdrawProceeds} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Withdraw Proceeds
                </button>
            }
            { (withdrawing === true) &&
                <LoadingSpinnerButton text={"Withdrawing..."} />
            }
        </div>
    </div>
  )
}

export default Proceeds