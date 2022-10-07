import React, { Component } from 'react'
import { BiUpload } from "react-icons/bi"
import { AiOutlineDown } from "react-icons/ai"
import { AiOutlineMenu } from "react-icons/ai"
import { IoClose } from "react-icons/io5"

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
      <>
        <div className="z-20 relative flex justify-between items-center h-14 bg-slate-100 ">
          <div className='text-4xl ml-12 italic font-semibold font-serif '>
            lexical
          </div>
          <div className='sm:flex hidden justify-center items-center space-x-6 mr-8 text-xl'>
            <div className='flex items-end space-x-1'><span>Explore</span><AiOutlineDown/></div>
            <div>SignIn</div>
            <div className='flex items-center space-x-2 font-bold font-mono rounded-full py-px px-3 tracking-wide bg-emerald-900 text-white '>
              <span><BiUpload/></span><span>Upload</span>
            </div>
          </div>
          <div onClick={this.toggleMenuButton} className={`${!this.state.showMenuButton && "hidden"} sm:hidden mr-8 text-2xl hover:cursor-pointer`}><AiOutlineMenu/></div>
          <div onClick={this.toggleMenuButton} className={`${this.state.showMenuButton && "hidden"} sm:hidden mr-8 text-2xl hover:cursor-pointer`}><IoClose/></div>
        </div>
        <div className={`absolute ${this.state.showMenuButton && !this.state.firstRender ? "animate-hideslow" : !this.state.showMenuButton && "animate-dropslow "}
         z-0 -top-14 sm:hidden font-semibold items-center border-b-2 border-slate-500 text-white py-1.5 px-3 bg-cyan-900 w-full`}>
          <div className='mb-2'>Explore</div>
          <div className='mb-2'>SignIn</div>
          <div>Upload</div>
        </div>
      </>
    )
  }
}

export default NavBar