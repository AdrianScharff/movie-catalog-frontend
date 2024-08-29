/* eslint-disable react/prop-types */
import React from 'react'

const MovieContainer = ({ children }) => {
  return (
    <div className='grid grid-cols-4 gap-4 px-[25rem] py-[3rem]'>
      {children}
    </div>
  )
}

export default MovieContainer
