import React, { Component } from 'react'
import {Link} from "react-router-dom"

const Photo = React.forwardRef((props, ref) => {

  class Photo extends Component {
    constructor(props) {
      super(props)
      this.state = {
        showDetails: false,
      }
      this.imageRef = React.createRef()
    }

  componentDidMount(){
    const {height, width} = this.props.values
    const imageDivWidth = this.imageRef.current.scrollWidth
    const imageDivHeight = (height/width) * imageDivWidth
    this.imageRef.current.style.height = imageDivHeight + "px"
  }


    render() {
      const {values:{id, description}, link} = this.props
      const urls = this.props.values.urls ? this.props.values.urls : this.props.values.cover_photo.urls
      const title = this.props.values.title

      return (
        <Link to={`/${link}/${id}?title=${title}`}>
          <div ref={ref} className={` rounded-md border mt-2 p-1.5 shadow-md `}>
            <div className=' rounded-md border shadow-sm bg-slate-100'> 
            {title && <h2 className='font-mono text-center font-bold py-2 text-lg'>{title}</h2>}
                <img ref={this.imageRef} src={urls.regular} 
                className='hover:cursor-pointer w-full' alt={description}/>
            </div>
          </div>
        </Link>
      )
    }
  }

  return <Photo  {...props}/>
})

export default Photo