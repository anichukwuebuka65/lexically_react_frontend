import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { unsplash } from '../home/unsplash'
import Photos from '../photos'

function CollectionsDetails({displayButton}) {
  let page = 1
  const {id} = useParams()
  const title = useSearchParams()[0].get("title")
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
      <h1 className='text-center font-bold font-mono text-3xl'>{title}</h1>
      <Photos photos={details} ref={fetchMoreRef} link="photo-detail"/>
    </div>
  )
}

export default CollectionsDetails