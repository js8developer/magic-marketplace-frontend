import axios from "axios"

export async function fetchTokenPrices(){
    try {
      const response = await axios.get("http://localhost:8081/token-prices")
      if (response.data){
        const tokenPriceData = response.data
        const currentEthereumPriceInUsd = tokenPriceData["ethereum"].usd
        return currentEthereumPriceInUsd
      }
    } catch (error) {
      console.log(error)
    }
    return 0.00
  }