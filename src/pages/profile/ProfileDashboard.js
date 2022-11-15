import React from 'react'

import TitleText from '../../components/nav/TitleText'
import WithdrawCard from '../../components/profile/WithdrawCard'
import MyListings from '../../components/profile/MyListings'
import NFTPortfolio from '../../components/profile/MyNFTs'

const ProfileDashboard = ({ chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts, marketItems }) => {

  return (
    <div>
        <TitleText title='Profile Dashboard' />
        <div className='p-4 space-y-10'>
          <WithdrawCard wallet={wallet} />
          <MyListings 
            wallet={wallet}
            marketItems={marketItems}
          />
          <NFTPortfolio
              wallet={wallet}
              chain={chain}
              nfts={nfts}
              setNfts={setNfts}
              filteredNfts={filteredNfts}
              setFilteredNfts={setFilteredNfts}
          />
        </div>
    </div>
    
  )
}

export default ProfileDashboard