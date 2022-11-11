import { useState, useEffect } from 'react'
import axios from 'axios'

import { ProfileNFTCard } from './cards/ProfileNFTCard';
import { Link } from 'react-router-dom';

const NFTPortfolio = ({ chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts }) => {

    const [nameFilter, setNameFilter] = useState("")
    const [idFilter, setIdFilter] = useState("")

    // // // // // //
    // Filter Checks
    // // // // // //
    const nameFilterIncludesNftNames = (i) => {
        return (nfts[i].name.toLowerCase().includes(nameFilter) || nfts[i].name.toUpperCase().includes(nameFilter));
    }

    const idFilterIsEmpty = () => {
        return idFilter.length === 0
    }

    const nameFilterIsEmpty = () => {
        return nameFilter.length === 0
    }

    const idFilterIncludesNftTokenIds = (i) => {
        return nfts[i].token_id.includes(idFilter)
    }

    async function manageFilters(){
        if (idFilterIsEmpty() && nameFilterIsEmpty()){
            return setFilteredNfts(nfts)
        }

        let filNfts = []
        for (let i = 0; i < nfts.length; i++){
            if (nameFilterIncludesNftNames(i) && idFilterIsEmpty()){
                filNfts.push(nfts[i])
            } else if (idFilterIncludesNftTokenIds(i) && nameFilterIsEmpty()){
                filNfts.push(nfts[i])
            } else if (idFilterIncludesNftTokenIds(i) && nameFilterIncludesNftNames(i)){
                filNfts.push(nfts[i])
            }
        }

        setFilteredNfts(filNfts)
    }

    useEffect(() => {
        manageFilters()
    }, [nameFilter, idFilter])


    async function loadUsersNfts(){
        const response = await axios.get("http://localhost:8081/user-nfts", {
            params: {
                address: wallet,
                chain: chain
            },
        })

        if (response.data){
            processNFTsData(response.data.result)
        }
    }

    function processNFTsData(nftsData){
        
        for (let i = 0; i < nftsData.length; i++){
            let meta = JSON.parse(nftsData[i].metadata)
            
            if (meta && meta.image){
                if (meta.image.includes(".")){
                    nftsData[i].image = meta.image
                } else {
                    let edited = meta.image.replace('ipfs://', '')
                    nftsData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
                }
            }
        }
        setNfts(nftsData)
        setFilteredNfts(nftsData)
    }
    


  return (
    <div className='space-y-8'>
      <div className="flex flex-items space-x-4 align-middle">
            <h1 className='font-bold text-3xl'>NFT Portfolio</h1>
            <button className="text-black-500 bg-slate-100 p-3 rounded-md h-12" onClick={loadUsersNfts}>Refresh</button>
      </div>

      <div className="flex flex-items space-x-4 py-4">
        <div>
            <label for="token_id" className="block mb-2 text-sm font-medium text-blue-500">Name</label>
            <input
            className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
            id="NameF"
            label="Name Filter"
            value={nameFilter}
            style={{}}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Sorcerer Mickey"
            />
        </div>
        
        <div>
            <label for="token_id" className="block mb-2 text-sm font-medium text-blue-500">Token Id</label>
            <input
            className="bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
            id="IdF"
            label="Id Filter"
            value={idFilter}
            style={{}}
            onChange={(e) => setIdFilter(e.target.value)}
            placeholder="1"
            />
        </div>
        
      </div>


        <div className="nftList">
            { 
                filteredNfts.length > 0 &&
                filteredNfts.map((nft) => {
                    return (
                        <Link to={`/profile/${nft.token_address}/${nft.token_id}`}>
                            <ProfileNFTCard 
                                nft={nft}
                            />
                        </Link>
                    );
                })
            }
        </div>
    </div>
  )
}

export default NFTPortfolio