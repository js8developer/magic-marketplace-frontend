import axios from 'axios'

export async function fetchMarketItems(){
  try {
    const response = await axios.get("http://localhost:8081/market-items")
    if (response.data){
      const marketItems = await processMarketItems(response.data)
      return marketItems
    }
  } catch (error){
    console.log(error)
  }
    
}

async function processMarketItems(nftsData){
    let marketItems = []
    for (let i = 0; i < nftsData.length; i++){
      const nftAddress = nftsData[i].nftAddress
      const tokenId = nftsData[i].tokenId
      if (nftAddress.toString() !== "0x0000000000000000000000000000000000000000"){
        const meta = await getMetadata(nftAddress, tokenId)
        const metadata = JSON.parse(meta.metadata)
        
        // NFT Token Name
        const nftTokenName = meta.name
        nftsData[i].name = nftTokenName

        // NFT Token Name
        const nftTokenImageUri = metadata.image
        let edited = nftTokenImageUri.replace('ipfs://', '')
        nftsData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
        
        marketItems.push(nftsData[i])
      }
    }
    return marketItems
}

async function getMetadata(nftAddress, tokenId){
  try {
      const response = await axios.get("http://localhost:8081/nft-metadata", {
        params: {
          nftAddress: nftAddress,
          chain: "5",
          tokenId: tokenId
        }
      })
      if (response.data){
        return response.data
      }
  } catch (error){
      console.log(error)
  }
}