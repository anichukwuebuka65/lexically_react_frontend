import React, { Component } from 'react'

class IntroSection extends Component {
 
  render() {
    return (
      <div className="bg-unsplash bg-cover bg-center px-4 p-10 min-h-1/2">
        <div className=' grid content-center md:w-3/4 lg:w-1/2 mx-auto pb-2 pt-14 text-white'>
            <p className='font-bold text-center text-2xl mb-3 tracking-widest'>Stunning free images & royalty free stock</p>
            <p className='tracking-wider text-center'>
              Over 2.6 million+ high quality stock images shared by our talented community.
            </p>
            {this.props.children}
        </div>
      </div>
    )
  }
}

export default IntroSection