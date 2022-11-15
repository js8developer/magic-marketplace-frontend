import React, {useState, useEffect} from 'react'

export default function Filters({ nfts, setFilteredNfts }) {

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


  return (
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
  )
}
