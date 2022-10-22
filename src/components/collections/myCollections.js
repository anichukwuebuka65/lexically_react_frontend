import React, { useCallback, useEffect, useState } from 'react'
import { unsplash } from '../home/unsplash'
import Photos from '../photos'
import CollectionHeader from './collectionHeader'

function MyCollections() {
    const [collections, setCollections] = useState([])
    const [name, setName] = useState("")
    const [username, setUsername] = useState(null)
    const [isEmpty, setIsEmpty] = useState("")
    const [err, setErr] = useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        if(!name) return setIsEmpty("Field cannot be empty")
        fetchCollections(name)
        .then(data => {
            console.log(data)
            setCollections(data)
            localStorage.setItem("lexically__name", name); 
        })
    }

    const fetchCollections = useCallback((username) => {
        return new Promise( (resolve, reject) => unsplash.users.getCollections({username})
            .then(res => { 
                resolve(res.response.results)
            })
            .catch(() => setErr("Something went wrong. Cross-check your username and try again"))
        )
    },[])

    useEffect(() => {
        setUsername(localStorage.getItem("lexically__name"))
    },[name])

    useEffect(() => {
       username && fetchCollections(username).then( data => setCollections(data))
    },[fetchCollections, username])

    if (!username && collections.length === 0 ) {
        return (
            <form onSubmit={handleSubmit} className='md:w-1/2 mx-auto'>
                <p className=' my-3 text-xl'>Enter your <span className='font-semibold'>Unsplash.com</span> username to get your collections</p>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" 
                className='block outline-none border rounded-md h-9 border-emerald-400 mt-2 md:w-2/3 px-2 placeholder:italic placeholder:text-sm' 
                placeholder='Username'/>
                {isEmpty && <p className='text-xs text-red-600'>{isEmpty}!</p>}
                <button type="submit" className=' bg-emerald-900 rounded-full py-px px-3 mt-5 text-white'>
                    SignIn
                </button>
                {err && <p className='text-xs text-red-600 my-3'>{err}</p>}
            </form>

        )
    }

  return (
    <div>
        <CollectionHeader/>
        <Photos photos={collections} link="my-collections" />
    </div>
  )
}

export default MyCollections