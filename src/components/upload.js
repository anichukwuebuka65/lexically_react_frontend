import React, { Component } from 'react'
import withNavigate from './withNavigate'

export class upload extends Component {

  constructor() {
    super()
    this.state = {
       name: ""
    }
    this.username = localStorage.getItem("lexically__name")
  }

  handleFileChange = (event) => {
    this.setState(state => ({
      ...state,
    name: event.target.value }))
  }
  render() {
    const {name} = this.state

      return (
        <div>
          <input onChange={this.handleFileChange} value={name} type="text" className='w-2/3 mx-auto block mb-3 placeholder:tracking-wide placeholder:italic focus:outline-none rounded-md p-2 border' 
          placeholder="Your unsplash username"/>
          <p className='text-center mb-3'>
            <a onClick={localStorage.setItem("lexically__name", name)} href={name ? "http://localhost:5000/redirect" : "#"} 
            className='font-semibold border-2 border-zinc-500 rounded-md tracking-wide py-1 px-3'>Sign In</a> 
            <em> to upload your photos</em>
          </p>
        </div>
          
      )
    // return (
    //   <>
    //   <form onSubmit={e => this.handleSubmit(e)} className=' m-2'>
    //     <label className='text-2xl p-2 block border-dashed border-2 border-gray-400' htmlFor='file'><b>Browse</b> to choose image</label>
    //     <input onChange={this.handleFileChange} className='hidden' type="file" id="file"/>
    //     {file && <p className='text-sm rounded-sm bg-gray-200 w-2/3 inline-block italic px-1 mt-1'>{file.name}</p>}
    //     <button type="submit" className='block float-right mt-3 border-2 rounded px-2 text-lg border-gray-400' >Submit</button>
    //   </form>
    //   <ul className='mt-10 text-xs flex flex-col space-y-1 m-2'>
    //     <li>&#8226; Photos are clear & original</li>
    //     <li>&#8226; High quality photos (at least 5MP)</li>
    //     <li>&#8226; Only upload photos you own the rights to</li>
    //   </ul>
    //   </>
    // )
  }
}

export default withNavigate(upload)