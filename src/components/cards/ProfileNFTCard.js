import { ethers } from "ethers"
import MagicMarketplaceABI from '../../blockchain/abi/MagicMarketplace.json'
import { magicMarketplaceAddress } from "../../blockchain/address/MagicMarketplace"
import formatAddress from "../../utils/formatAddress"

export const ProfileNFTCard = ({ nft }) => {
    
    // async function listNftForSale() {
    //     console.log('listNftForSale')
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     const signer = provider.getSigner()

    //     const nftAddress = nft.token_address.toString()
    //     const tokenId = Number(nft.token_id)
    //     const price = ethers.utils.parseEther("0.001")

    //     const magicMarketplace = new ethers.Contract(magicMarketplaceAddress, MagicMarketplaceABI.abi, signer)
    //     const approveABI = [
    //         "function approve(address to, uint256 tokenId)"
    //     ]
    //     const nftContract = new ethers.Contract(nftAddress, approveABI, signer)
    //     // 1. Approve the nft contract to be listed
    //     const approveTxn = await nftContract.approve(magicMarketplaceAddress, tokenId)
    //     await approveTxn.wait()

    //     // 2. List the nft
    //     const listingTxn = await magicMarketplace.listItemForSale(nftAddress, tokenId, price, {
    //         gasLimit: 500000
    //     })
    //     await listingTxn.wait()

    //     console.log('NFT Successfully Listed on the Marketplace. ✅')
    // }

    return (
        <div className="w-64 space-y-2">
            <img className="rounded-md w-full h-44 object-cover bg-indigo-800" src={nft.image} alt={nft.tokenId} />
            <div className="text-sm text-gray">Collection: {formatAddress(nft.token_address)} </div>
            <div className="text-sm text-black">{nft.name}</div>
            <div className="text-sm text-gray">Token #: {nft.token_id}</div>
        </div>
    )
}