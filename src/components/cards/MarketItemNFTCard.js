import { ethers } from "ethers"
import formatAddress from '../../utils/formatAddress'

export const MarketItemNFTCard = ({ nft, wallet, ethPrice, maticPrice }) => {

    const priceInUSD = (chain) => {
        const listingPrice = ethers.utils.formatUnits(nft.price)
        let price

        if (chain === 'matic') {
            price = (Number(maticPrice) * Number(listingPrice))
        } else {
            price = (Number(ethPrice) * Number(listingPrice))
        }
        
        return price.toFixed(2)
    }

    return (
        <div className="w-64 bg-white rounded-lg shadow-md">
            <img className="rounded-t-lg w-full h-44 object-cover" src={nft.image} alt={nft.nftAddress} />
            
            <div className="p-3 space-y-2">
                <div className="space-y-0">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900">{nft.name}</h5>
                    <p className="font-normal text-gray-700">Contract: {formatAddress(nft.nftAddress)}</p>
                    <p className="font-normal text-gray-700">Token: {nft.tokenId}</p>
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="text-lg font-bold text-gray-900">${priceInUSD('eth')}</div>
                    <div className="text-sm pt-1 italic text-gray-500">{ethers.utils.formatUnits(nft.price)} ETH</div>
                </div>
                
            </div>
            
        </div>
    )
}