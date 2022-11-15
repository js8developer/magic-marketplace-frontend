import React from 'react'
import { Link } from 'react-router-dom';
import { MarketItemNFTCard } from '../../components/cards/MarketItemNFTCard';

const MyListings = ({ wallet, marketItems }) => {

    const myListings = () => {
        let listings = []
        for (let i = 0; i < marketItems.length; i++){
            if (marketItems[i].seller.toLowerCase() === wallet.toLowerCase()){
                listings.push(marketItems[i])
            } 
        }
        return listings
    }

    return (
        <div className='space-y-1'>
          <h1 className='font-bold text-3xl'>My Listings</h1>
          <div className='p-4'>
              <div className="flex flex-wrap gap-8">
                    { 
                        myListings().length > 0 &&
                        myListings().map((nft) => {
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

export default MyListings