import React, { Component } from 'react'
import {AiOutlineArrowUp} from "react-icons/ai"
import { Outlet } from "react-router-dom"
import Upload from "./upload"
import { IoClose } from "react-icons/io5"
import NavBar from './home/navBar'


class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {
           isUploadModalOpen:false
        }
        this.scrollRef = React.createRef()
        this.buttonRef = React.createRef()
        this.goUp = this.goUp.bind(this)
        this.toggleUploadModal = this.toggleUploadModal.bind(this)
      }
       

      toggleUploadModal(){
        this.setState((state) => ({...state, isUploadModalOpen: !state.isUploadModalOpen}))
      }
    
      goUp(event){
        event.stopPropagation()
        this.scrollRef.current.scrollTo(0, 0)
        this.buttonRef.current.style.display = "none"
    
      }
    
    render (){
        return (
            <>
                <div ref={this.scrollRef} className=" h-screen overflow-auto z-10">
                    <NavBar toggleUploadModal={this.toggleUploadModal}/>
                    {this.props.children}
                    <Outlet/>
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
            </>
        )
    }
}

export default Layout