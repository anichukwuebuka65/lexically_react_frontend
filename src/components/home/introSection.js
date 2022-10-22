import React, { Component } from 'react'

class IntroSection extends Component {
 
  render() {
    return (
      <div className="bg-unsplash bg-cover bg-center px-4 pb-5 pt-10 min-h-1/2">
        <div className=' grid content-center md:w-3/4 lg:w-1/2 mx-auto pb-2 pt-8 text-white'>
            <p className='font-bold text-center text-2xl  tracking-widest'>Stunning free images & royalty free stock</p>
            {this.props.children}
        </div>
      </div>
    )
  }
}

export default IntroSection