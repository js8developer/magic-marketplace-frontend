import React from 'react'
import { ethers } from 'ethers'

import DisneyKey from '../../assets/disney-key.png'

const ExperienceCard = ({ experience }) => {

  return (
    <div class="w-full bg-white rounded-lg border border-gray-200 shadow-md flex flex-row">
        <img class="rounded-l-lg object-cover w-64" src={DisneyKey} alt="" />
        
        <div class="p-5">
            
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{experience.name}</h5>
            
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{experience.description}</p>
            <div class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                View experience
            </div>
        </div>
    </div>
  )
}

export default ExperienceCard