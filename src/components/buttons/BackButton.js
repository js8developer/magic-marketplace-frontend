import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({ toPath, buttonText }) => {
  
  return (
    <Link to={toPath}>
        <button className='py-3 px-6 bg-slate-100 rounded-lg font-semibold'>{buttonText}</button>    
    </Link>
  )
}

export default BackButton