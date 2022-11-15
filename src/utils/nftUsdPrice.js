import { ethers } from "ethers"

export function nftUsdPrice(nftPrice) {
    const listingPrice = ethers.utils.formatUnits(nftPrice)
    const mockEthPrice = 1300
    let price = (Number(mockEthPrice) * Number(listingPrice))
    return price.toFixed(2)
}