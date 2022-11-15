const formatAddress = (address) => {
    if (address.toString() === "0x0000000000000000000000000000000000000000"){
        return address
    }
    const first7 = address.slice(0,7)
    const last5 = address.slice(address.length - 5, address.length)
    return `${first7}...${last5}`
}

export default formatAddress
