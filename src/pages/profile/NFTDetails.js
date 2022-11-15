import { Link, useParams } from 'react-router-dom'

import TitleText from '../../components/nav/TitleText';
import formatAddress from '../../utils/formatAddress';
import BackButton from '../../components/buttons/BackButton';


const NFTDetails = ({ nfts }) => {

    const { address, tokenId } = useParams();
    const nft = nfts.find((nft) => (nft.token_address === address) && (nft.token_id === tokenId))

  return (
    <div>
        <TitleText title='NFT Details' />
        <div className='p-10 space-y-10'>
            <BackButton toPath={`/profile`} buttonText='Back to Profile'/>
            {
                nft &&  
                <div>
                    <div className='flex flex-row space-x-10'>
                        <img className="object-cover rounded-lg w-80 h-80" src={nft.image} alt={nft.token_address} />
                        <div className='space-y-6'>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-blue-500">{nft.name}</div>
                                <div className="font-normal text-gray-500">Contract: {formatAddress(nft.token_address)}</div>
                            </div>
                            <div className="text-2xl font-bold text-gray-700">#{nft.token_id}</div>
                            <div>
                                <Link to={`/create-listing/${nft.token_address}/${nft.token_id}`}>
                                    <button className="h-10 w-64 bg-blue-700 text-white rounded-md">Create Listing</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default NFTDetails