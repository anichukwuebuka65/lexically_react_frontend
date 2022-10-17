import React, { Component } from 'react'
import PhotoDetails from "./components/photoDetails"
import Collections from "./components/collections"                                                                                                          
import CollectionsDetails from "./components/collectionsDetails"                                                                                                          
import {Routes, Route} from "react-router-dom"
import Layout from './components/layout'
import Home from './components/home/home'
import SearchResults from './components/searchResults'
import WithNavigate from './components/withNavigate'
import IntroSection from "./components/home/introSection"
import SearchInput from "./components/home/searchInput"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      token: props.token,
    }
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
    return (
      <Routes>
        <Route path="/" element={<Layout ref={this.layoutRef}>
          <IntroSection >
            <SearchInput handleSearch={this.handleSearch}/>
          </IntroSection>
          </Layout>}>
          <Route index element={
                <Home photos={this.state.photos} displayButton={this.displayButton} handleFetch={this.handleFetch} />
              } />
          <Route path="search" element = { <SearchResults photos={this.state.photos} />} />
          <Route path="collections" element={<Collections token={this.state.token}/>} />
          <Route path="photo-detail/:id" element = {<PhotoDetails />} />
          <Route path="collections/:id" element = {<CollectionsDetails displayButton={this.displayButton}/>} />
        </Route>
      </Routes>
    )
  }
}

export default WithNavigate(App)