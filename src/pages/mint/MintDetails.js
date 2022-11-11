import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Link, useParams } from 'react-router-dom'

import TitleText from '../../components/TitleText'
import formatAddress from '../../utils/formatAddress'
import PriceBox from '../../components/PriceBox'
import LoadingSpinnerButton from '../../components/buttons/LoadingSpinnerButton'

import Mickey from '../../assets/mickey.png'

import CoreAbi from '../../blockchain/abi/DisneyRandomNFT.json'

const MintDetails = ({ nftCollections, ethPrice, maticPrice }) => {

  const { address } = useParams();
  const nftCollection = nftCollections.find((collection) => collection.address === address)

  const [minting, setMinting] = useState(false)
  
  async function mint(){
    console.log('minting new nft...')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
 
    
    const nftCollectionContract = new ethers.Contract(nftCollection.address, CoreAbi.abi, signer)
    const mintFee = await nftCollectionContract.getMintFee()
    const mintTxn = await nftCollectionContract.requestNft({ 
      value: mintFee.toString()
    })
    setMinting(true)
    await mintTxn.wait(1)

    // Need to listen for response
    await new Promise(async (resolve, reject) => {
      setTimeout(() => reject("Timeout: 'NFTMinted' event did not fire"), 300000) // 5 minute timeout time
      // setup listener for our event
      nftCollectionContract.once("NftMinted", async () => {
          resolve()
      })
    })
    setMinting(false)
    console.log(`Successfully Minted a ${nftCollection.name} NFT! ✅`)
  }



  

  const MintButton = () => {
    return (
      <button type="button" onClick={mint} class="py-2.5 px-5 mr-2 text-sm font-medium text-white bg-indigo-600 rounded-lg inline-flex items-center">
        Mint NFT
      </button>
    )
  }


  return (
    <div>
        <TitleText title={`${nftCollection.name}`} />

        <div className='p-10 space-y-10'>
            
            <Link to={`/nft-collections`}>
                <div>Back to NFT Collections</div>    
            </Link>

            {
                nftCollection &&  
                <div>
                    <div className='flex flex-row space-x-10'>
                        <img className="object-cover rounded-lg w-80 h-80" src={nftCollection.image || Mickey} alt={nftCollection.name} />

                        <div className='space-y-6'>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-blue-500">{nftCollection.name}</div>
                                <div className="font-normal text-gray-500">Contract: {formatAddress(nftCollection.address)}</div>
                            </div>
                            <div className="font-normal text-gray-500">{nftCollection.description}</div>
                            
                            <PriceBox 
                                price={0}
                                ethPrice={ethPrice}
                                maticPrice={maticPrice}
                            />
                                                          
                            {
                              (minting === true) &&
                              <LoadingSpinnerButton text={'Minting...'}/>
                            }
                            {
                              (minting === false) &&
                              <MintButton />
                            }
                            
                        </div>
                    </div>
                </div>
            }
        </div>

    </div>
  )

}

export default MintDetails