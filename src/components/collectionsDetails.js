import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { unsplash } from './home/unsplash'
import Photos from './photos'

function CollectionsDetails({displayButton}) {
  let page = 1
  const {id} = useParams()
  const [details, setDetails] = useState([])
  const fetchMoreRef = useRef()
  const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        fetchCollections()
        displayButton()
      }
  })

  useEffect(() => {
    if(fetchMoreRef.current) observer.observe(fetchMoreRef.current)
  })    

  const fetchCollections = useCallback(() => {
    unsplash.collections.getPhotos({collectionId: id,page, perPage: 20})
    .then(res => {
      setDetails((state) => [...state, ...res.response.results])
      page++
    })
  },[id,page])

  useEffect(() => {
    fetchCollections()
  },[id, fetchCollections])

  return (
    <div>
      <Photos photos={details} ref={fetchMoreRef} link="photo-detail"/>
    </div>
  )
}

export default CollectionsDetails