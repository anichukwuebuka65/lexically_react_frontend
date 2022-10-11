import React, { Component } from 'react'
import { FcLike } from "react-icons/fc"
import { unsplash } from "./home/unsplash"
import { useParams } from 'react-router-dom'

const WithRouter = (props) => {
    const {id} = useParams()

    class PhotoDetails extends Component {
        constructor() {
        super()
        this.state = {
            photoDetails: {},
            loading: true
        }
        this.imageRef = React.createRef()
        
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
            <div className=' rounded-lg border shadow-md '> 
                <img ref={this.imageRef} src={urls?.regular} className=' w-full' alt={description}/>
                <p className='text-sm mx-2 font-mono italic'>
                Image by: <span className='font-semibold inline-block bg-slate-300 py-px px-1.5 rounded-sm text-md text-zinc-700'>{user?.name}</span>
                </p>
                <div className='flex items-center space-x-2 text-sm'>
                <div className=' text-lg'><FcLike/></div>
                <div className='text-zinc-600 font-semibold' >{likes}</div> 
                </div> 
                <div className='p-2 font-sans'>
                <p className='inline-block'><b>Views: </b>{views}</p>
                <button className='float-right bg-gray-500 px-2 rounded-sm shadow-sm mx-2.5 text-white'>
                    <a download href={`${links.download}&force=true`}>Download</a>
                </button>
                {description && <p><b>Description: </b>{description}</p>}
                </div>
            </div>
        )
        }
    }
    return  <PhotoDetails {...props} id={id} />
}

export default WithRouter