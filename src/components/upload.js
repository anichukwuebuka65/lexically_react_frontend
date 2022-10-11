import React, { Component } from 'react'

export class upload extends Component {
  render() {
    return (
      <>
      <form className='p-2 border-dashed border-2 border-gray-400 m-2'>
        <label className='text-2xl ' htmlFor='file'><b>Browse</b> to choose image</label>
        <input className='hidden' type="file" id="file"/>
        <button className='block float-right mt-5 border-2 rounded px-2 text-lg border-gray-400' >Submit</button>
      </form>
      <ul className='mt-10 text-xs flex flex-col space-y-1 m-2'>
        <li>&#8226; Photos are clear & original</li>
        <li>&#8226; High quality photos (at least 5MP)</li>
        <li>&#8226; Only upload photos you own the rights to</li>
      </ul>
      </>
    )
  }
}

export default upload