import React, { Component } from 'react'
import { unsplash } from "./unsplash"


class Categories extends Component {
  constructor(){
    super()
    this.num = 20;
    this.state = {
      contentsList : ["Random","Mountain","Cars","Houses","Rivers","Furnitures","Planes","Trees"],
      selected: "Random",
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(item){
    this.setState((state) => ({
      ...state,
      selected: item
    }))
    unsplash.search.getPhotos({
      query: item
  })
  .then(res => {
      this.props.handleSearch(res.response.results)
  })
  .catch(err => console.log(err))
  }


  render() {
    return (
      <>
      <div className='flex justify-center bg-slate-200'>
        <div  className='justify-center'>
          {this.state.contentsList.map((item, i) => <div key={item} onClick={() => this.handleClick(item)} 
          className={`z-40 hover:cursor-pointer hover:bg-slate-500 hover:text-white h-10 inline-block
          ${this.state.selected === item && "border-b-2 border-purple-900"} py-1 px-2`}>
            {item}
          </div>)}
        </div>
      </div>
      <div className='w-full'>{this.props.children}</div>
      </>
    )
  }
}

export default Categories