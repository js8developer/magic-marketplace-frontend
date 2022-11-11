import React from 'react'
import formatAddress from '../../utils/formatAddress'
import Mickey from '../../assets/mickey.png'

const NFTCollectionCard = ({ nftCollection }) => {
 
    return (
        <div class="w-80 bg-white rounded-lg border border-gray-200 shadow-md">
            <img class="rounded-t-lg object-cover" src={nftCollection.image || Mickey} alt="" />
            
            <div class="p-5">
                
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{nftCollection.name}</h5>
                
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{formatAddress(nftCollection.address)}</p>
                <div class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View Collection
                </div>
            </div>
        </div>
      )
}

export default NFTCollectionCard