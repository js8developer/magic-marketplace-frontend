import React from 'react'
import NFTPortfolio from '../../components/NFTPortfolio'
import Proceeds from '../../components/Proceeds'
import TitleText from '../../components/TitleText'

const ProfileDashboard = ({ chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts, ethPrice, maticPrice }) => {

  return (
    <div>
        <TitleText title='Profile Dashboard' />
        <div className='p-4 space-y-10'>
          <Proceeds
              wallet={wallet}
              ethPrice={ethPrice}
              maticPrice={maticPrice}
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