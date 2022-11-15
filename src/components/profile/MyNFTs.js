import { Link } from 'react-router-dom';

import Filters from './Filters';
import { ProfileNFTCard } from '../cards/ProfileNFTCard';

import { loadUsersNfts } from '../../api/user-nfts'


const MyNFTs = ({ chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts }) => {
   
    async function loadNfts(){
        const nfts = await loadUsersNfts(wallet, chain)
        setNfts(nfts)
        setFilteredNfts(nfts)
    }
    
  return (
    <div className='space-y-8'>
        <div>
            <div className="flex flex-items space-x-4 align-middle">
                <h1 className='font-bold text-3xl'>My NFTs</h1>
                <button className="text-black-500 font-medium bg-slate-100 py-2 px-4 rounded-md" onClick={loadNfts}>Refresh</button>
            </div>
            <Filters nfts={nfts} setFilteredNfts={setFilteredNfts}/>
        </div>
        <div className="flex flex-wrap gap-8">
            { 
                filteredNfts.length > 0 &&
                filteredNfts.map((nft) => {
                    return (
                        <Link to={`/profile/${nft.token_address}/${nft.token_id}`}>
                            <ProfileNFTCard nft={nft} />
                        </Link>
                    );
                })
            }
        </div>
    </div>
  )
}

export default MyNFTs