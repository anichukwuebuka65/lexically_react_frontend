import React, { Component } from 'react'
import Photos from "../photos"
import Categories from './categories'
import { unsplash } from "./unsplash"

 class Home extends Component {
    constructor(){
        super()
        this.state = {
            photos: [],
            loading: false,
            err: null
        }
      this.lastPhotoRef = React.createRef()
      this.page = 1
      this.controller = new AbortController()
      this.fetchPhotos = this.fetchPhotos.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
      this.observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          this.fetchPhotos(10)
          .then((result) => this.setState(state => ({...state, photos: [...state.photos, ...result]})))
          this.props.displayButton()
        }
      })
    }

    fetchPhotos(numPerPage = 20) {
      this.observer.disconnect()
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
      .then((result => {
        this.setState(state => ({...state, photos: result}))
      }))
      .catch(() => this.setState(state => ({...state, err: "something went wrong"})))
    }

    componentDidUpdate(){
     if(this.lastPhotoRef.current) {
      this.observer.observe(this.lastPhotoRef.current)
     }
    }

    handleSearch(item){
      this.setState((state) => ({...state, loading: true}))
      this.setState((state) => ({
        ...state,
        selected: item
      }))
      unsplash.search.getPhotos({
        query: item
      })
      .then(res => {
          this.setState({photos: res.response.results, loading: false})
      })
      .catch(()=> this.setState(state => ({...state, loading: false})))
    }

    componentWillUnmount(){
      this.controller.abort()
    }

    render() {
      if(this.state.err) return this.state.err
      return(
        <div className='relative'> 
          <Categories handleSearch={this.handleSearch}/>
          {this.state.loading && 
            <div className='absolute top-16 w-full'>
                <div className=' mx-auto h-10 w-10 animate-loading rounded-full border-4 border-y-blue-500'></div>
            </div>
          }
          <div className='w-full' >
            <Photos photos={this.state.photos} ref={this.lastPhotoRef} link="photo-detail"/>
          </div>
        </div>
      ) 
    }
}

export default Home