import React from 'react'
import { Link } from 'react-router-dom';

import TitleText from '../../components/TitleText';
import NFTCollectionCard from '../../components/cards/NFTCollectionCard';

const MintableCollections = ({ nftCollections }) => {

  return (
    <div className='space-y-10'>
        <TitleText title='Mintable Collections' />

        <div className='p-4 pt-4 space-y-10'>
          <div>
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Mint today.</h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">They said it's just a jpeg, huh? Not at Disney. NFTs can also serve as tickets to unlocking new magical experiences.</p>
          </div>

          <div className="nftList">
              { 
                  nftCollections.length > 0 &&
                  nftCollections.map((nftCollection) => {
                      return (
                        <Link to={`/nft-collections/${nftCollection.address}`}>
                          <NFTCollectionCard 
                            nftCollection={nftCollection}
                          />
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