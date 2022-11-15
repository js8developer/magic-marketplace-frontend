import axios from "axios"

export async function loadUsersNfts(wallet, chain){
    try {
        const response = await axios.get("http://localhost:8081/user-nfts", {
            params: {
                address: wallet,
                chain: chain
            },
        })
        if (response.data){
            const userNfts = processNFTsData(response.data.result)
            return userNfts
        }
    } catch (error) {
        console.log(error)
    }
}

function processNFTsData(nftsData){
    let data = nftsData
    for (let i = 0; i < data.length; i++){
        let meta = JSON.parse(data[i].metadata)
        
        if (meta && meta.image){
            if (meta.image.includes(".")){
                data[i].image = meta.image
            } else {
                let edited = meta.image.replace('ipfs://', '')
                data[i].image = "https://ipfs.moralis.io:2053/ipfs/" + edited
            }
        }
    }
    
    return data
}