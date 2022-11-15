import React from 'react'
import { Link } from 'react-router-dom'

import { MarketItemNFTCard } from '../../components/cards/MarketItemNFTCard'
import TitleText from '../../components/nav/TitleText'


const Marketplace = ({ wallet, marketItems }) => {
  
  return (
    <div className='space-y-10'>
      <TitleText title='Magic Marketplace ✨' />
      <div className='p-4'>
          <div className="flex flex-wrap gap-8">
                { 
                    marketItems.length > 0 &&
                    marketItems.map((nft) => {
                        return (
                          <Link to={`/marketplace/${nft.itemId}`}>
                              <MarketItemNFTCard
                                nft={nft}
                                wallet={wallet}
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

export default Marketplace

