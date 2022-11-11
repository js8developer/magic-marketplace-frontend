import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ethers } from 'ethers';
import axios from 'axios';

import Header from './components/Header';
import Marketplace from './pages/marketplace/Marketplace';
import ProfileDashboard from './pages/profile/ProfileDashboard';
import Experiences from './pages/experiences/Experiences';
import MintableCollections from './pages/mint/MintableCollections';


import MarketItemDetails from './pages/marketplace/MarketItemDetails';
import ExperienceDetails from './pages/experiences/ExperienceDetails'
import MintDetails from './pages/mint/MintDetails';
import NFTDetails from './pages/profile/NFTDetails'
import CreateListing from './pages/profile/CreateListing';


function App() {
  const chain_goerli = "5"

  const [wallet, setWallet] = useState("")
  const [chain, setChain] = useState(chain_goerli)
  const [nfts, setNfts] = useState([])
  const [filteredNfts, setFilteredNfts] = useState([])
  const [marketItems, setMarketItems] = useState([])
  const [experiences, setExperiences] = useState([])
  const [nftCollections, setNftCollections] = useState([])
  const [ethPrice, setEthPrice] = useState(null)
  const [maticPrice, setMaticPrice] = useState(null)

  useEffect(() => {
    async function getAccount(){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0])
    }
    async function loadMarketData(){
      await loadMarketItems()
    }
    async function loadExperiences(){
      await loadExperiencesData()
    }
    async function loadNftCollections(){
      await loadNftCollectionsData()
    }
    async function loadTokenPrices(){
      await loadTokenPricesData()
    }

    getAccount()
    listenForAccountsChanged()
    loadMarketData()
    loadExperiences()
    loadNftCollections()
    loadTokenPrices()
  }, [])

  function listenForAccountsChanged(){
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log('Account changed! 🚨')
      setWallet(accounts[0])
    });
  }


  // // // // // //
  // Marketplace
  // // // // // //
  async function loadMarketItems(){
    const response = await axios.get("http://localhost:8081/fetchMarketItems")
    if (response.data){
      processMarketItems(response.data)
    }
  }

  async function processMarketItems(nftsData){
    let marketItems = []
    for (let i = 0; i < nftsData.length; i++){
      const nftAddress = nftsData[i].nftAddress
      const tokenId = nftsData[i].tokenId
      if (nftAddress.toString() !== "0x0000000000000000000000000000000000000000"){
        const meta = await getMetadata(nftAddress, tokenId)
        const metadata = JSON.parse(meta.metadata)
        console.log('meta', meta)
        console.log('metadata', metadata)
        
        // NFT Token Name
        const nftTokenName = meta.name
        nftsData[i].name = nftTokenName

        // NFT Token Name
        const nftTokenImageUri = metadata.image
        let edited = nftTokenImageUri.replace('ipfs://', '')
        nftsData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
        
        marketItems.push(nftsData[i])
      }
    }
    setMarketItems(marketItems)
  }

  async function processMarketItems_FutureVersion(nftsData){
    let marketItems = []
    for (let i = 0; i < nftsData.length; i++){
      const nftAddress = nftsData[i].nftAddress

      const nftTokenImageUri = nftsData[i].tokenImageUri
      let edited = nftTokenImageUri.replace('ipfs://', '')
      nftsData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
      
      if (nftAddress.toString() !== "0x0000000000000000000000000000000000000000"){
        marketItems.push(nftsData[i])
      }
    }
    setMarketItems(marketItems)
  }
  

  async function getMetadata(nftAddress, tokenId){
    const response = await axios.get("http://localhost:8081/nftMetadata", {
      params: {
        nftAddress: nftAddress,
        chain: "5",
        tokenId: tokenId
      }
    })
    if (response.data){
      return response.data
    }
  }

  // // // // // //
  // Experiences
  // // // // // //
  async function loadExperiencesData(){
    const response = await axios.get("http://localhost:8081/experiences")
    if (response.data){
      setExperiences(response.data)
    }
  }

  // // // // // // //
  // NFT Collections
  // // // // // // //
  async function loadNftCollectionsData(){
    const response = await axios.get("http://localhost:8081/collections")
    if (response.data){
      setNftCollections(response.data)
    }
  }

  // // // // // // //
  // Token Prices
  // // // // // // //
  async function loadTokenPricesData(){
    // Uncomment this when going live...
    // accidentally fired off a bunch of calls in background and exceeded rate limit

    // try {
    //   const response = await axios.get("http://localhost:8081/token-prices")
    //   if (response.data){
    //     const tokenPriceData = response.data
    //     setEthPrice(tokenPriceData["ethereum"].usd)
    //     setMaticPrice(tokenPriceData["matic-network"].usd)
    //   }
    // } catch (e) {
    //   console.log(e)
    //   const mockEthPrice = 1300.00
    //   const mockMaticPrice = 1.08
    //   setEthPrice(mockEthPrice)
    //   setMaticPrice(mockMaticPrice)
    // }

    const mockEthPrice = 1300.00
    const mockMaticPrice = 1.08
    setEthPrice(mockEthPrice)
    setMaticPrice(mockMaticPrice)
  }



  const bodyPages = () => {
    return (
      <div>
        <Routes>
          <Route exact 
            path="/" 
            element={ 
            <Marketplace 
              wallet={wallet}
              marketItems={marketItems}
              ethPrice={ethPrice}
              maticPrice={maticPrice}
            /> 
          }/>
          
          <Route 
            path="/profile" 
            element={ 
                <ProfileDashboard
                    wallet={wallet}
                    chain={chain}
                    nfts={nfts}
                    setNfts={setNfts}
                    filteredNfts={filteredNfts}
                    setFilteredNfts={setFilteredNfts}
                    ethPrice={ethPrice}
                    maticPrice={maticPrice}
                  /> 
            }
          />

          <Route 
            path="/experiences"
            element={
              <Experiences 
                experiences={experiences}
              />
          }
          />

          <Route 
            path="/nft-collections"
            element={
              <MintableCollections 
                nftCollections={nftCollections}
              />
            }
          />


          <Route 
            path="/marketplace/:itemId"
            element={
              <MarketItemDetails 
                wallet={wallet}
                marketItems={marketItems}
                ethPrice={ethPrice}
                maticPrice={maticPrice}
              />
            }
          />

          <Route 
            path="/experiences/:address"
            element={
              <ExperienceDetails
                wallet={wallet}
                experiences={experiences}
              />
            }
          />

          <Route
            path="/nft-collections/:address"
            element={
              <MintDetails 
                wallet={wallet}
                nftCollections={nftCollections}
                ethPrice={ethPrice}
                maticPrice={maticPrice}
              />
            }
          />

          <Route
            path="/profile/:address/:tokenId"
            element={
              <NFTDetails 
                wallet={wallet}
                nfts={nfts}
              />
            }
          />

          <Route
          path={`/create-listing/:address/:tokenId`}
          element={
            <CreateListing 
              wallet={wallet}
              nfts={nfts}
            />
          }
          />

        </Routes>
      </div>
    )
  }

  return (
    <div className="App">
        <Router>
            <Header wallet={wallet} />
            { bodyPages() }
        </Router>  
    </div>
  );
}

export default App;
