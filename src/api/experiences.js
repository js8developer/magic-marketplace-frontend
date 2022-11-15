import axios from "axios"

import DisneyKey from '../assets/disney-key.png'
import KTTK from '../assets/kttk.png'
import MickeysXmas from '../assets/mickeys-xmas.png'
import Castle50 from '../assets/castle-50.png'

import { 
    afterHoursAddress,
    mickeysXmasAddress,
    kttkAddress
 } from "../blockchain/address"


export async function fetchExperiences(){
    try {
        const response = await axios.get('http://localhost:8081/experiences')
        if (response.data){
            const experiencesData = response.data
            const experiences = processExperiencesData(experiencesData)
            return experiences
        }
    } 
    catch (error){
        console.log(error)
    }
}

function processExperiencesData(experiencesData){
    let data = experiencesData
    for (let i = 0; i < data.length; i++){
        const nftAddress = data[i].address 

        if (nftAddress === kttkAddress){
            data[i].image = KTTK
        } 
        else if (nftAddress === mickeysXmasAddress){
            data[i].image = MickeysXmas
        } 
        else if (nftAddress === afterHoursAddress){
            data[i].image = Castle50
        } 
        else {
            data[i].image = DisneyKey
        }
    }
    return data
}