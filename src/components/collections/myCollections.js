import React, { useCallback, useEffect, useState } from 'react'
import { unsplash } from '../home/unsplash'
import Photos from '../photos'
import CollectionHeader from './collectionHeader'

function MyCollections(props) {
    const [collections, setCollections] = useState([])
    const [err, setErr] = useState("Cross-check username and try again")
    const [name, setName] = useState("")

    function handleChange(e){
        setErr("")
        setName(e.target.value)
    }

    const fetchCollections = useCallback((user) => {
        console.log(user)
        return new Promise( (resolve, reject) => unsplash.users.getCollections({username: user})
            .then(res => {
                setErr("") 
                resolve(res.response.results)
            })
            .catch(() => { 
                setErr('Cross-check name  "'+ user +'" and try again')
            })
            .finally(() => sessionStorage.setItem("lexically__name", user))
        )
    },[])

    function handleSubmit(e){
        setErr("")
        e.preventDefault()
        fetchCollections(name)
        .then(data => setCollections(data))
    }

    useEffect(() => {
        const username = sessionStorage.getItem("lexically__name")
        fetchCollections(username).then( data => setCollections(data))
    },[fetchCollections])

  return (
    <div>
        <CollectionHeader/>
        {err || collections.length === 0 ?
        <form onSubmit={handleSubmit}>
            <p className='text-center italic my-1 text-md text-red-500'> {err} </p>
            <input onChange={handleChange} value={name} type="text" className='w-2/3 mx-auto block mb-3 placeholder:tracking-wide placeholder:italic focus:outline-none rounded-md p-2 border' 
                placeholder="Your unsplash username"/>
            <button type="submit" className=' block mx-auto  font-semibold border-2 border-zinc-500 rounded-md tracking-wide py-1 px-3'>Sign In</button> 
        </form>  : 
            <Photos photos={collections} link="my-collections" />
        }
    </div>
  )
}

export default MyCollections