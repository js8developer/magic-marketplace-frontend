import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import LoadingSpinnerButton from '../buttons/LoadingSpinnerButton'

import MagicMarketplaceABI from '../../blockchain/abi/MagicMarketplace.json'
import { magicMarketplaceAddress } from "../../blockchain/address"
import { nftUsdPrice } from '../../utils/nftUsdPrice'


const WithdrawCard = ({ wallet }) => {
    
    const [proceeds, setProceeds] = useState('0.00')
    const [usdPrice, setUsdPrice] = useState('0.00')
    const [withdrawing, setWithdrawing] = useState(false)

    useEffect(() => {
        async function loadProceeds(){
            await fetchProceeds()
        }
        loadProceeds()
    }, [])
    

    async function fetchProceeds(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, provider)
        const proceeds = await magicMarketplace.fetchProceeds(wallet)
        const proceedsFormatted = ethers.utils.formatEther(proceeds)
        setProceeds(proceedsFormatted)
        const proceedsAsNumber = nftUsdPrice(proceeds)
        setUsdPrice(proceedsAsNumber.toString())
    }

    async function withdrawProceeds(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
        const withdrawProceedsTxn = await magicMarketplace.withdrawProceeds()
        setWithdrawing(true)
        await withdrawProceedsTxn.wait()
        setProceeds('0.00')
        setWithdrawing(false)
    }


  return (
    <div className='flex flex-row '>
        <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md space-y-4">
            <div className='space-y-2'>
                <h5 class="text-xl font-bold tracking-tight text-gray-900">Current Balance</h5>
                <div className='flex flew-row inline-block align-middle space-x-2'>
                    <div className="text-xl font-bold text-gray-900">${usdPrice}</div>
                    <div className="text-lg font-normal text-gray-400">{proceeds} ETH</div>
                </div>
            </div>
            <div class="font-normal text-gray-700 dark:text-gray-400">
                Click below to withdraw your current earnings from the Magic Marketplace
            </div>
            <div>   
                { (withdrawing === false) &&
                    <button href="#" onClick={withdrawProceeds} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg">
                        Withdraw Earnings
                    </button>
                }
                { (withdrawing === true) &&
                    <LoadingSpinnerButton text={"Withdrawing..."} />
                }
            </div>
        </div>
    </div>
  )
}

export default WithdrawCard