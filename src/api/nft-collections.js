import axios from 'axios'

import DisneyRandomGroup from '../assets/DisneyRandomGroup.png'
import InsideOutCover from '../assets/insideout-cover.png'
import FrozenCover from '../assets/frozen-cover.png'

import {
    insideOutAddress,
    frozenAddress,
    disneyRandomAddress
} from "../blockchain/address"


export async function fetchNftCollections(){
    try {
        const response = await axios.get("http://localhost:8081/nft-collections")
        if (response.data){
            const collectionsData = response.data
            const collections = processCollectionsData(collectionsData)
            return collections
        }
    } catch (error){
        console.log(error)
    }
    
}

function processCollectionsData(collectionsData){
    let data = collectionsData
    for (let i = 0; i < data.length; i++){
        const nftCollectionAddress = data[i].address
        if (nftCollectionAddress === disneyRandomAddress){
            data[i].image = DisneyRandomGroup
        } else if (nftCollectionAddress === insideOutAddress){
            data[i].image = InsideOutCover
        } else if (nftCollectionAddress === frozenAddress){
            data[i].image = FrozenCover
        }
    }
    return data
}
