import React from 'react'

const ExperienceCard = ({ experience }) => {

  return (
    <div class="flex flex-row w-full bg-white rounded-lg border border-gray-200 shadow-md">
        <img class="rounded-l-lg object-cover w-64 h-48" src={experience.image} alt="" />
        <div class="p-4 space-y-3">
            <div class="text-xl font-bold tracking-tight text-gray-900">{experience.name}</div>
            <div class="font-normal text-gray-700">{experience.description}</div>
            <button class="inline-flex items-center py-2 px-12 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                View experience
            </button>
        </div>
    </div>
  )
}

export default ExperienceCard