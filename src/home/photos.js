import React, { Component } from 'react'
import Photo from "./photo"
import { unsplash } from "./unsplash"

 class Photos extends Component {
    constructor(props){
        super(props)
        this.state = {
            photos: [],
        }
      this.page = 1
      this.controller = new AbortController()
      this.renderPhotosByDiv = this.renderPhotosByDiv.bind(this)
    }

    fetchPhotos(numPerPage = 20) {
      return new Promise((resolve, reject) => {
        unsplash.photos.list({page: this.page, perPage: numPerPage},{signal: this.controller.signal})
        .then(res => {
          resolve(res?.response.results)
          this.page++
        })
        .catch(err => reject(err))
        }
      )
  }
    componentDidMount(){
      this.fetchPhotos()
      .then((result => this.props.handleFetch(result)))
    }

    componentWillUnmount(){
      this.controller.abort()
    }

    renderPhotosByDiv(div, photos,incrementBy) {
      const j = photos.length
      const newArray = []
      for(let i = div; i < j; i = i + incrementBy ){
          newArray.push(photos[i])
       }
      return newArray 
    }

    render() { 

      if(this.props.photos.length === 0 ) {
        return (
          <div className='w-1/2 mx-auto mt-14'>
            <div className=' mx-auto h-10 w-10 animate-loading rounded-full border-4 border-y-blue-500'></div>
          </div>)
      }
      if(window.innerWidth > 950) {
        const divPhotos1 = this.renderPhotosByDiv(2,this.props.photos,3).map(item => <Photo key={item.id}  values={item}/>)
        const divPhotos2 = this.renderPhotosByDiv(1,this.props.photos,3).map(item => <Photo key={item.id}  values={item}/>)
        const divPhotos3 = this.renderPhotosByDiv(3,this.props.photos,3).map(item => <Photo key={item.id}  values={item}/>)

        return (
          <div className='md:grid md:grid-cols-3 gap-2'>
            <div>{divPhotos1}</div>
            <div>{divPhotos2}</div>
            <div>{divPhotos3}</div> 
          </div>
        )

      } else {
        const divPhotos1 = this.renderPhotosByDiv(1,this.props.photos,2).map(item => <Photo key={item.id} values={item}/>)
        const divPhotos2 = this.renderPhotosByDiv(2,this.props.photos,2).map(item => <Photo key={item.id} values={item}/>)

        return (
          <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
            <div>{divPhotos1}</div>
            <div>{divPhotos2}</div>
          </div>
        )
      }
    }
}

export default Photos