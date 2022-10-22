import React, { Component } from 'react'
import { FcLike } from "react-icons/fc"
import { unsplash } from "./home/unsplash"
import { IoClose } from "react-icons/io5"
import WithNavigate from './withNavigate'

class PhotoDetails extends Component {
    constructor() {
    super()
    this.state = {
        photoDetails: {},
        loading: true
    }
    this.imageRef = React.createRef()
    this.closeModal = this.closeModal.bind(this)
    }

    closeModal(event){
        if(event.target === event.currentTarget ) {
            this.props.navigate(-1)
        } 
        }

    componentDidUpdate(){
        const {height, width} = this.state.photoDetails
        const imageDivWidth = this.imageRef.current.scrollWidth
        const imageDivHeight = (height/width) * imageDivWidth
        this.imageRef.current.style.height = imageDivHeight + "px"
    }

    componentDidMount() {
        unsplash.photos.get({photoId: this.props.id})
        .then((result) => {
        this.setState((state) => ({...state, photoDetails: result.response, loading:false}))
        }) 
    }

    render() {
    const {urls, links, description, user, views, likes} = this.state.photoDetails
    if(this.state.loading) {
        return (
            <div className='w-1/2 mx-auto mt-14'>
                <div className=' mx-auto h-10 w-10 animate-loading rounded-full border-4 border-y-blue-500'></div>
            </div>)
    }

    return (
        <main onClick={this.closeModal} className='h-screen absolute md:bg-opacity-40 top-0 bg-white md:bg-zinc-900 overflow-auto w-full z-50'>
            <button onClick={() => this.props.navigate(-1)} className=' rounded-full inline-block mt-6 ml-6 md:text-white p-px text-4xl' >
                <IoClose/>
            </button>
            <div className='bg-white  md:w-2/3 sm:w-3/4 mx-auto py-6 md:px-28 md:py-7 rounded-md'>
                <div className=' rounded-lg border shadow-md '> 
                    <img ref={this.imageRef} src={urls?.regular} className=' w-full' alt={description}/>
                    <p className='text-sm mx-2 font-mono italic'>
                    Image by: <span className='font-semibold inline-block bg-slate-300 py-px px-1.5 rounded-sm text-md text-zinc-700'>{user?.name}</span>
                    </p>
                    <div className='flex items-center space-x-2 text-sm'>
                    <div className=' text-lg'><FcLike/></div>
                    <div className='text-zinc-600 font-semibold' >{likes}</div> 
                    </div> 
                    <div className='p-4 font-mono'>
                    <p className='inline-block mb-3'><b>Views: </b>{views}</p>
                    <button className='float-right bg-gray-500 px-2 rounded-sm shadow-sm mx-2.5 text-white'>
                        <a download href={`${links.download}&force=true`}>Download</a>
                    </button>
                    {description && <p><b>Description: </b><small>{description}</small></p>}
                    </div>
                </div>
            </div>
        </main>
    )
    }
}

export default WithNavigate(PhotoDetails)