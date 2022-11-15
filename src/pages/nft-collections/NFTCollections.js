import React from 'react'
import { Link } from 'react-router-dom';

import TitleText from '../../components/nav/TitleText';
import NFTCollectionCard from '../../components/cards/NFTCollectionCard';

const MintableCollections = ({ nftCollections }) => {
  
  return (
    <div className='space-y-10'>
        <TitleText title='NFT Collections' />
        <div className='px-4 space-y-10'>
          <div>
            <h1 class="mb-4 text-5xl font-extrabold tracking-tight leading-none text-gray-900">Grow your <span class="underline underline-offset-3 decoration-8 decoration-indigo-500">collection</span>.</h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Mint your favorite Disney characters as digital collectibles (NFTs)! Your digital collectibles can be traded in the Marketplace, and also double as your key to new experiences!</p>
          </div>
          <div className="flex flex-wrap gap-8">
              { 
                  nftCollections.length > 0 &&
                  nftCollections.map((nftCollection) => {
                      return (
                        <Link to={`/nft-collections/${nftCollection.address}`}>
                          <NFTCollectionCard nftCollection={nftCollection} />
                        </Link>
                      );
                  })
              }
          </div>
        </div>
    </div>
  )
}

export default MintableCollections