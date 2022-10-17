import React, { Component } from 'react'
import { BiUpload } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import { IoClose } from "react-icons/io5"
import { Link } from 'react-router-dom'

class NavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      isNavVisible: "none",
      showMenuButton: true,
      firstRender: true
    }
    this.toggleMenuButton = this.toggleMenuButton.bind(this)
  }

  toggleMenuButton(){
    this.setState((state) => ({
      ...state,
      showMenuButton: !state.showMenuButton,
      firstRender: false
    }))
  }

  render() {

    return (
      <header className='fixed right-0 left-0 z-40'>
        <div className="z-20 relative flex justify-between items-center h-14 bg-slate-100 ">
          <Link to="/" className='md:text-4xl md:px-6  italic font-black rounded-sm ml-2 font-mono'>
          <span>Lexical</span>
          </Link>
          <div className='sm:flex hidden font-mono justify-center items-center space-x-6 mr-8 text-lg'>
            <Link to="/collections" className=' hover:cursor-pointer hover:underline'>collections</Link>
            <a href="http://localhost:5000/redirect" className='hover:cursor-pointer hover:underline'>signIn</a>
            <button onClick={this.props.toggleUploadModal} className='flex items-center space-x-2 font-bold font-mono rounded-full py-px px-3 tracking-wide bg-emerald-900 text-white '>
              <span><BiUpload/></span>
              <b>Upload</b>
            </button>
          </div>
          <button onClick={this.toggleMenuButton} className={`${!this.state.showMenuButton && "hidden"} sm:hidden mr-8 text-2xl hover:cursor-pointer`}><AiOutlineMenu/></button>
          <button onClick={this.toggleMenuButton} className={`${this.state.showMenuButton && "hidden"} sm:hidden mr-8 text-2xl hover:cursor-pointer`}><IoClose/></button>
        </div>
        <div className={`absolute ${this.state.showMenuButton && !this.state.firstRender ? "animate-hideslow" : !this.state.showMenuButton && "animate-dropslow "}
         z-0 -top-14 sm:hidden font-semibold items-center border-b-2 border-slate-500 text-white py-1.5 px-3 bg-cyan-900 w-full`}>
          <div className='mb-2'>Explore</div>
          <div className='mb-2'>SignIn</div>
          <button onClick={this.props.toggleUploadModal}>Upload</button>
        </div>
      </header>
    )
  }
}

export default NavBar