import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ethers } from 'ethers';

import Navbar from './components/nav/Navbar';
// Main Pages
import Marketplace from './pages/marketplace/Marketplace';
import ProfileDashboard from './pages/profile/ProfileDashboard';
import Experiences from './pages/experiences/Experiences';
import MintableCollections from './pages/nft-collections/NFTCollections';
// Details Views
import MarketItemDetails from './pages/marketplace/MarketItemDetails';
import ExperienceDetails from './pages/experiences/ExperienceDetails'
import NFTCollectionDetails from './pages/nft-collections/NFTCollectionDetails';
import NFTDetails from './pages/profile/NFTDetails'
import CreateListing from './pages/profile/CreateListing';

// APIs
import { fetchTokenPrices } from './api/token-prices'
import { fetchNftCollections } from './api/nft-collections'
import { fetchExperiences } from './api/experiences'
import { fetchMarketItems } from './api/marketplace'


function App() {
  const [wallet, setWallet] = useState("")
  const [chain, setChain] = useState("5")
  const [nfts, setNfts] = useState([])
  const [filteredNfts, setFilteredNfts] = useState([])
  const [marketItems, setMarketItems] = useState([])
  const [experiences, setExperiences] = useState([])
  const [nftCollections, setNftCollections] = useState([])

  function listenForAccountsChanged(){
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log('Account changed! 🚨')
      setWallet(accounts[0])
    });
  }

  useEffect(() => {
    async function getAccount(){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0])
    }
    async function loadMarketData(){
      let marketItems = await fetchMarketItems()
      setMarketItems(marketItems)
    }
    async function loadExperiences(){
      let experiences = await fetchExperiences()
      setExperiences(experiences)
    }
    async function loadNftCollections(){
      let collections = await fetchNftCollections()
      setNftCollections(collections)
    }
    async function loadTokenPrices(){
      await fetchTokenPrices()
    }

    getAccount()
    listenForAccountsChanged()
    loadMarketData()
    loadExperiences()
    loadNftCollections()
    loadTokenPrices()
  }, [])

  


  return (
    <div className="App">
        <Router>
            <Navbar wallet={wallet} />
            
            <Routes>

              <Route 
                exact 
                path="/" 
                element={<Marketplace wallet={wallet} marketItems={marketItems}/>}
              />
              
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
                      marketItems={marketItems}
                    /> 
                }
              />

              <Route 
                path="/experiences"
                element={<Experiences experiences={experiences}/>}
              />

              <Route 
                path="/nft-collections"
                element={<MintableCollections nftCollections={nftCollections}/>}
              />

              <Route 
                path="/marketplace/:itemId"
                element={<MarketItemDetails wallet={wallet} marketItems={marketItems}/>}
              />

              <Route 
                path="/experiences/:address"
                element={<ExperienceDetails experiences={experiences}/>}
              />

              <Route
                path="/nft-collections/:address"
                element={<NFTCollectionDetails nftCollections={nftCollections}/>}
              />

              <Route
                path="/profile/:address/:tokenId"
                element={<NFTDetails nfts={nfts}/>}
              />

              <Route
                path={`/create-listing/:address/:tokenId`}
                element={<CreateListing nfts={nfts}/>}
              />

            </Routes>
        </Router>  
    </div>
  );
}

export default App;
