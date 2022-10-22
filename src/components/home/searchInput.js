import React, { Component } from 'react'
import { unsplash } from "./unsplash"
import {GoSearch} from "react-icons/go" 
import WithNavigate from '../withNavigate'

class SearchInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: "",
        }
    this.controller = new AbortController()
    this.signal = this.controller.signal
    this.handleSearch = this.handleSearch.bind(this)
    this.submit = this.submit.bind(this)
    }

    handleSearch(e){
        this.setState({
            search: e.target.value
        })
    }

    submit(event) {
        event.preventDefault()
        unsplash.search.getPhotos({
            query: this.state.search
        },{signal: this.signal})
        .then(res => {
            this.props.handleSearch(res.response.results)
            this.props.navigate("/search")
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount(){
        this.controller.abort()
    }

  render() {

    return (
        <>
            <form  className='flex items-center justify-between mt-5 bg-white h-12 rounded-lg'>
              <input className='w-5/6 text-black px-3 tracking-wider  outline-none'
              placeholder='Search for Photos' 
              onChange={this.handleSearch} type = "text" value={this.state.search} ></input>
              <button onClick={this.submit} className='inline-block text-black text-2xl px-4 fo hover:cursor-pointer'><GoSearch/></button>
            </form>
        </>
    )
  }
}

export default WithNavigate(SearchInput)