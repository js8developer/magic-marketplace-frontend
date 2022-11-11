import React from 'react'

const TitleText = ({ title }) => {
  return (
    <h1 className="p-4 font-bold text-3xl text-white bg-gradient-to-r from-indigo-900 via-purple-500 to-indigo-700">{title}</h1>
  )
}

export default TitleText