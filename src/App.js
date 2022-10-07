import React, { Component } from 'react'
import NavBar from './home/navBar'
import IntroSection from './home/introSection'
import Categories from './home/categories'
import Photos from './home/photos'
import SearchInput from './home/searchInput'


class App extends Component {
  constructor() {
    super()
    this.state = {
       photos: [],
    }
    this.scrollRef = React.createRef()
    this.photoRef = React.createRef()
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  handleFetch(items) {
    this.setState((state) =>({ photos:[...state.photos,...items]}))
  }

  handleSearch(items) {
    console.log(items[5].urls.regular)
    this.setState({ photos: items })
  }

  loadMore(){
    let {scrollTop, clientHeight,scrollHeight} = this.scrollRef.current
    if(scrollTop + clientHeight > scrollHeight - 700) {
      this.scrollRef.current.scrollBy(0,-100)
      setTimeout(() => this.photoRef.current.fetchPhotos(10),1000)
    }
  }

  render() {
    return (
      <div onScroll={this.loadMore} ref={this.scrollRef} className="relative h-screen overflow-auto">
        <NavBar/>
        <IntroSection >
          <SearchInput handleSearch={this.handleSearch}/>
        </IntroSection>
        <Categories photos={this.state.photos}>
          <Photos  ref={this.photoRef} handleFetch={this.handleFetch} photos={this.state.photos}/>
        </Categories>
      </div>
    )
  }
}

export default App