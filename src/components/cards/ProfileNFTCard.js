import formatAddress from "../../utils/formatAddress"
import DisneyPass from "../../assets/disney-pass.png"

export const ProfileNFTCard = ({ nft }) => {
    
    return (
        <div className="w-64 space-y-2 bg-white rounded-lg shadow-md">
            <img className="rounded-t-md w-full h-44 object-cover bg-indigo-800" src={nft.image || DisneyPass} alt={nft.tokenId} />
            <div className="p-3 space-y-2">
                <div className="text-md font-medium text-black truncate">{nft.name}</div>
                <div className="text-sm text-gray">Collection: {formatAddress(nft.token_address)} </div>
                <div className="text-sm text-gray">Token #: {nft.token_id}</div>
            </div>
        </div>
    )
}