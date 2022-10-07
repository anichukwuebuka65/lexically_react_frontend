import React, { Component } from 'react'
import { FcLike } from "react-icons/fc"

 class Photo extends Component {
  constructor() {
    super()
    this.imageRef = React.createRef()
  }

 componentDidMount(){
  const {height, width} = this.props.values
  const imageDivWidth = this.imageRef.current.scrollWidth
  const imageDivHeight = (height/width) * imageDivWidth
  this.imageRef.current.style.height = imageDivHeight + "px"
 }

  render() {
    const {urls, description, user, likes} = this.props?.values

    return (
      <div className='rounded-md border mt-2 p-1.5 shadow-md  '>
        <div className='rounded-md border shadow-sm bg-slate-100'>
          <div>
            <img ref={this.imageRef} src={urls.regular} className='w-full' alt={description}/>
          </div>
          <p className='text-sm mx-2 font-mono italic'>
            Image by: <span className='font-semibold inline-block bg-slate-300 py-px px-1.5 rounded-sm text-md text-zinc-700'>{user.name}</span>
          </p>
          <div className='flex items-center space-x-2 text-sm'>
            <div className=' text-lg'><FcLike/></div>
            <div className='text-zinc-600 font-semibold' >{likes}</div> 
          </div>
        </div>
      </div>
    )
  }
}

export default Photo