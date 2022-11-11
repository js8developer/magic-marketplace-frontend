import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ethers } from 'ethers';

import TitleText from '../../components/TitleText';
import DisneyKey from '../../assets/disney-key.png'
import formatAddress from '../../utils/formatAddress';
import PriceBox from '../../components/PriceBox';

import LoadingSpinnerButton from '../../components/buttons/LoadingSpinnerButton';

const ExperienceDetails = ({ wallet, experiences }) => {
    const { address } = useParams();
    const experience = experiences.find((experience) => experience.address === address)
    
    const [maxTicketsAvailable, setMaxTicketsAvailable] = useState('')
    const [ticketsClaimed, setTicketsClaimed] = useState('')
    const [ticketsLeftToClaim, setTicketsLeftToClaim] = useState('')
    const [mintEligible, setMintEligible] = useState(null)

    const [minting, setMinting] = useState(false)

    useEffect(() => {
        async function loadTixData(){
            await fetchWalletTicketsData()
        }

        loadTixData()
    }, [])

    // // // // // // // //
    // Blockchain Actions
    // // // // // // // //
    async function mintTicket(){
        if (experience.address === ''){ return }
        console.log('mintTicket at address:', experience.address)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const experienceContract = new ethers.Contract(experience.address, experience.abi, signer)
        const claimTicketTxn = await experienceContract.claimTicketToExperience()
        setMinting(true)
        await claimTicketTxn.wait()
        setMinting(false)
        console.log(`Ticket Successfully Claimed to ${experience.name} ✅`)
    }

    async function fetchWalletTicketsData(){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const experienceContract = new ethers.Contract(experience.address, experience.abi, signer)
        const maxTixAvailable = await experienceContract.maxTicketsAvailableForAddress()
        const ticketsClaimed = await experienceContract.ticketsClaimedByAddress()
        const ticketsLeftToClaim = await experienceContract.ticketsLeftToClaim()
        setMaxTicketsAvailable(maxTixAvailable.toString())
        setTicketsClaimed(ticketsClaimed.toString())
        setTicketsLeftToClaim(ticketsLeftToClaim.toString())
        setMintEligible(Number(ticketsLeftToClaim) > 0)
    }

    // // // // // // // //
    // Components
    // // // // // // // //
    const MintButton = () => {
        return (
          <button type="button" onClick={mintTicket} class="py-2.5 px-5 mr-2 text-sm font-medium text-white bg-indigo-600 rounded-lg inline-flex items-center">
            Mint Ticket
          </button>
        )
      }


  return (
    <div>
        <TitleText title='Experience' />

        <div className='p-10 space-y-10'>
            
            <Link to={`/experiences`}>
                <div>Back to Experiences</div>    
            </Link>

            {
                experience &&  
                <div>
                    <div className='flex flex-row space-x-10'>
                        <img className="object-cover rounded-lg w-80 h-80" src={DisneyKey} alt={experience.name} />

                        <div className='space-y-6'>
                            <div>
                                <div className="text-lg font-semibold tracking-tight text-blue-500">{experience.name}</div>
                                <div className="font-normal text-gray-500">Contract: {formatAddress(experience.address)}</div>
                            </div>
                            <div className="font-normal text-gray-500">{experience.description}</div>
                            
                            <PriceBox 
                                ethPrice={'0'}
                                usdPrice={'0.00'}
                            />
                            
                            <div>
                                <div className="font-normal text-gray-500">Max Tix: {maxTicketsAvailable}</div>
                                <div className="font-normal text-gray-500">Tix Claimed: {ticketsClaimed}</div>
                                <div className="font-normal text-gray-500">Tix Left to Claim: {ticketsLeftToClaim}</div>
                            </div>

                            { // Show mint button
                                (mintEligible === true) &&
                                <>
                                    { (minting === false) && <MintButton /> }
                                    { (minting === true) && <LoadingSpinnerButton text={'Minting...'}/> }
                                </> 
                            }
                            { // Hide mint button; redirect to collection
                                (mintEligible === false) && 
                                <Link to={`/nft-collections/${experience.featuredCollections[0].address}`}>
                                    <div className="h-12 w-64 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-black bg-slate-100 rounded-lg">View Featured NFT Collection</div>    
                                </Link>
                            }

                        </div>
                    </div>
                </div>
            }
        </div>

    </div>
  )
}

export default ExperienceDetails