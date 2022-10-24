import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { unsplash } from '../home/unsplash'
import Photos from '../photos'
import CollectionHeader from './collectionHeader'

function MyCollections(props) {
    const [collections, setCollections] = useState([])
    const [err, setErr] = useState("")
    const username = localStorage.getItem("lexically__name")
    const navigate = useNavigate()


    const fetchCollections = useCallback((username) => {
        return new Promise( (resolve, reject) => unsplash.users.getCollections({username})
            .then(res => { 
                resolve(res.response.results)
            })
            .catch(() => setErr("error"))
        )
    },[])

    useEffect(() => {
        if (!username && collections.length === 0 ) return navigate("/collections?open=true")
        username && fetchCollections(username).then( data => setCollections(data))
    },[fetchCollections, username])

    if (!username && collections.length === 0 ) {
        return
    }

  return (
    <div>
        <CollectionHeader/>
        {err && <p className='text-center italic text-md'>something went wrong</p>}
        <Photos photos={collections} link="my-collections" />
    </div>
  )
}

export default MyCollections