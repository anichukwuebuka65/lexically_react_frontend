import React from 'react'
import Photos from './photos'

function SearchResults({ photos }) {
  return (
    <><Photos photos={photos} link="search"/></>
  )
}

export default SearchResults