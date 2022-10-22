import React, { Component } from 'react'
import PhotoDetails from "./components/photoDetails"
import Collections from "./components/collections/collections"                                                                                                          
import CollectionsDetails from "./components/collections/collectionsDetails"                                                                                                          
import {Routes, Route} from "react-router-dom"
import Layout from './components/layout'
import Home from './components/home/home'
import SearchResults from './components/searchResults'
import WithNavigate from './components/withNavigate'
import IntroSection from "./components/home/introSection"
import SearchInput from "./components/home/searchInput"
import MyCollections from './components/collections/myCollections'
import Photos from './components/photos'

class App extends Component {
  constructor() {
    super()
    this.state = {
      photos: [],
    }
    this.username = React.createRef()
    this.layoutRef = React.createRef()
    this.displayButton = this.displayButton.bind(this)
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    }

  displayButton(){
    this.layoutRef.current.buttonRef.current.style.display = "block"
  }

  handleFetch(items) {
    this.setState((state) =>({ photos:[...state.photos, ...items]}))
  }

  handleSearch(items) {
    this.setState({photos: items})
  }

  render() {
    const { photos } = this.state

    return (
      <Routes>
        <Route path="/" element={<Layout ref={this.layoutRef}>
          <IntroSection >
            <SearchInput handleSearch={this.handleSearch}/>
          </IntroSection>
          </Layout>}>
          <Route index element={
                <Home photos={photos} displayButton={this.displayButton} handleFetch={this.handleFetch} />
              } />
          <Route path="search" element = { <SearchResults photos={photos} />} />
          <Route path="collections" element={<Collections render={ data => (<Photos photos={data} link="collections"/>)}/>} />
          <Route path="my-collections" element={<MyCollections />} />
          <Route path="my-collections/:id" element={<CollectionsDetails displayButton={this.displayButton}/>}/>
          <Route path="photo-detail/:id" element = {<PhotoDetails />} />
          <Route path="collections/:id" element = {<CollectionsDetails displayButton={this.displayButton}/>} />
        </Route>
      </Routes>
    )
  }
}

export default WithNavigate(App)