import React from 'react'
import formatAddress from '../utils/formatAddress'

const WalletAddress = ({ wallet }) => {

  return (
    <div>
        <div className='bg-indigo-800 text-white rounded-md py-2 px-4 text-sm font-medium'>{formatAddress(wallet.toString())}</div>
    </div>
  )
}

export default WalletAddress