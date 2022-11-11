import React from 'react'
import { MarketItemNFTCard } from '../../components/cards/MarketItemNFTCard';
import { Link } from 'react-router-dom';

const MyListings = ({ wallet, marketItems, ethPrice, maticPrice }) => {

    const myListings = () => {
        let listings = []
        for (let i = 0; i < marketItems.length; i++){
            if (marketItems[i].seller.toLowerCase() === wallet.toLowerCase()){
                listings.push(marketItems[i])
            } else {
                console.log('Not a match')
            }
        }
        return listings
    }

    return (
        <div className='space-y-10'>
          <h1 className='font-bold text-3xl'>My Listings</h1>

          <div className='p-4'>
              <div className="nftList">
                    { 
                        myListings().length > 0 &&
                        myListings().map((nft) => {
                            return (
                              <Link to={`/marketplace/${nft.itemId}`}>
                                  <MarketItemNFTCard
                                    nft={nft}
                                    wallet={wallet}
                                    ethPrice={ethPrice}
                                    maticPrice={maticPrice}
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