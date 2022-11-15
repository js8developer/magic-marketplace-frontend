import { Link } from "react-router-dom";
import Disney50 from '../../assets/disney-50.png'
import WalletAddress from "./WalletAddress";

export default function Navbar({ wallet }){
    
    return (
        <nav className="p-5 flex flex-row justify-between items-center bg-gradient-to-r from-indigo-900 via-purple-500 to-indigo-700">
                <img className="w-64" src={Disney50} alt={'disney-50'}/>
                <div className="flex flex-row items-center">
                    <Link className="mr-4 p-6 font-semibold text-white" to="/">Marketplace</Link>
                    <Link className="mr-4 p-6 font-semibold text-white" to="/nft-collections">NFT Collections</Link>
                    <Link className="mr-4 p-6 font-semibold text-white" to="/experiences">Experiences</Link>
                    <Link className="mr-4 p-6 font-semibold text-white" to="/profile">Profile</Link>
                </div>
                <WalletAddress wallet={wallet}/>
        </nav>
    )
}

