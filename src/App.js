import React, { Component } from 'react'
import NavBar from './components/home/navBar'
import IntroSection from './components/home/introSection'
import Categories from './components/home/categories'
import Photos from './components/home/photos'
import PhotoDetails from "./components/photoDetails"
import Upload from "./components/upload"
import Collections from "./components/collections"
import SearchInput from './components/home/searchInput'
import {AiOutlineArrowUp} from "react-icons/ai"
import {Routes, Route,Link, Outlet, useNavigate, useSearchParams} from "react-router-dom"
import { IoClose } from "react-icons/io5"

const WithRouter = (props) => {
  const navigate = useNavigate()
  const [params , ...rest] = useSearchParams()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       photos: [],
       token: props.token,
       isUploadModalOpen:false
    }
    this.scrollRef = React.createRef()
    this.buttonRef = React.createRef()
    this.handleFetch = this.handleFetch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.displayButton = this.displayButton.bind(this)
    this.goUp = this.goUp.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggleUploadModal = this.toggleUploadModal.bind(this)
  }

  handleFetch(items) {
    this.setState((state) =>({ photos:[...state.photos,...items]}))
  }

  handleSearch(items) {
    this.setState({ photos: items })
  }

  displayButton(){
    this.buttonRef.current.style.display = "block"
  }

  closeModal(event){
    if(event.target === event.currentTarget) {
      this.props.navigate("/")
    }
  }

  toggleUploadModal(){
    this.setState((state) => ({...state, isUploadModalOpen: !state.isUploadModalOpen}))
  }

  goUp(event){
    event.stopPropagation()
    this.scrollRef.current.scrollTo(0, 0)
    this.buttonRef.current.style.display = "none"

  }

  render() {
    return (
      <Routes>
        <Route exact path="/" element={
          <>
            <div ref={this.scrollRef} className=" h-screen overflow-auto z-10">
              <NavBar toggleUploadModal={this.toggleUploadModal}/>
              <IntroSection >
                <SearchInput handleSearch={this.handleSearch}/>
              </IntroSection>
              <Categories handleSearch={this.handleSearch} >
                <Photos displayButton={this.displayButton} handleFetch={this.handleFetch} photos={this.state.photos}/>
              </Categories>
              <button ref={this.buttonRef} onClick={this.goUp} className='hidden animate-bounce fixed bottom-9 right-12 rounded-full bg-white text-3xl'>
                <AiOutlineArrowUp/>
              </button> 
              {this.state.isUploadModalOpen && <div  className=' absolute h-60 w-full sm:w-96 top-16 sm:right-2 border-2 sm:rounded-3xl bg-gray-50 z-50'>
                <button onClick={this.toggleUploadModal} className=' rounded-full inline-block bg-gray-400 text-white mt-2 ml-2 p-px text-2xl' >
                  <IoClose/>
                </button>
                <Upload />
              </div>}
            </div>
            <Outlet/>
          </>
        }>
        <Route path="photo-detail/:id" element = {
          <div onClick={this.closeModal} className='h-screen absolute bg-opacity-60 top-0 bg-slate-100 overflow-auto w-full z-50'>
            <Link to={"/"} className=' rounded-full inline-block mt-6 ml-6  bg-white p-px text-3xl' >
              <IoClose/>
            </Link>
            <div className='bg-white -mt-5 md:w-2/3 sm:w-3/4 mx-auto py-6 md:px-28 md:py-7 rounded-md'>
              <PhotoDetails />
            </div>
          </div>} />
        </Route>
        <Route path="collections" element={<Collections token={this.state.token}/>} />
      </Routes>
    )
  }
}
return <App {...props} navigate={navigate} token={params.get("token")}/>
}

export default WithRouter