import React from 'react'
import { Link } from 'react-router-dom'

function CollectionHeader(props) {
    const username = localStorage.getItem("lexically__name")
  return (
    <header className='pt-2'>
        <ul className='font-semibold font-mono flex justify-center items-center space-x-4'>
        <li className='border-r-2 hover:underline border-r-zinc-600 pr-4'>
            <Link to="/collections">
                Random Collections
            </Link>
        </li>
        <li className='hover:underline'>
            <Link onClick={username ? undefined : props.toggleUploadModal} to={ username ? "/my-collections" : undefined }>
                My Collections
            </Link>
        </li>
        </ul>
    </header>
  )
}

export default CollectionHeader