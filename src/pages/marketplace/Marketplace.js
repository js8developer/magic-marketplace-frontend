import React from 'react'
import { MarketItemNFTCard } from '../../components/cards/MarketItemNFTCard'
import TitleText from '../../components/TitleText'
import { Link } from 'react-router-dom'

const Marketplace = ({ wallet, marketItems, ethPrice, maticPrice }) => {
  
  return (
    <div className='space-y-10'>
      <TitleText title='Marketplace' />
      <div className='p-4'>
          <div className="nftList">
                { 
                    marketItems.length > 0 &&
                    marketItems.map((nft) => {
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

export default Marketplace




// async function MOCK_processMarketItems(nftsData){
//   let marketItems = []
//   for (let i = 0; i < nftsData.length; i++){
//     const nftAddress = nftsData[i].nftAddress
//     const tokenId = nftsData[i].tokenId

//     if (nftAddress.toString() !== "0x0000000000000000000000000000000000000000"){
//       const meta = {
//         metadata: {
//           image: "ipfs://QmNv81aGWv17izpqVdFSrHMpXDqZMpkGn7C82c84yiHs7H",
//         },
//         name: "Stitch Limited Edition NFT"
//       }
      
//       let edited = meta.metadata.image.replace('ipfs://', '')
//       nftsData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
//       nftsData[i].name = meta.name
      
//       marketItems.push(nftsData[i])
//     }
//   }
 
//   setMarketItems(marketItems)
// }