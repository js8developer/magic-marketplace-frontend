import React from 'react'
import { ethers } from 'ethers'

const PriceBox = ({ price, ethPrice, maticPrice }) => {

    // Formatting
    const priceInUsd = (chain) => {
        const listingPrice = ethers.utils.formatUnits(price)
        let priceInUsd

        if (chain === 'matic') {
            priceInUsd = (Number(maticPrice) * Number(listingPrice))
        } else {
            priceInUsd = (Number(ethPrice) * Number(listingPrice))
        }
        
        return priceInUsd.toFixed(2)
    }

    return (
        <div>
            <div className="font-normal text-gray-400">Current Price</div>

            <span className='flex flew-row inline-block align-middle space-x-4'>
                <div className="text-2xl font-bold text-gray-900">${priceInUsd('eth')}</div>
                <div className="text-md pt-1 font-normal text-gray-400"> {ethers.utils.formatUnits(price)} ETH</div>
            </span>
        </div>
    );
}

export default PriceBox