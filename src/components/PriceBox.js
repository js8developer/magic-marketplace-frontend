import React from 'react'
import { ethers } from 'ethers'
import { nftUsdPrice } from '../utils/nftUsdPrice';

const PriceBox = ({ price, labelText }) => {

    const usdPrice = nftUsdPrice(price)

    return (
        <div>
            <div className="font-normal text-gray-400">{labelText}</div>
            <span className='flex flew-row inline-block align-middle space-x-4'>
                <div className="text-2xl font-bold text-gray-900">${usdPrice}</div>
                <div className="text-md pt-1 font-normal text-gray-400"> {ethers.utils.formatUnits(price)} ETH</div>
            </span>
        </div>
    );
}

export default PriceBox