import React, { Component } from 'react'
import { unsplash } from "./unsplash"


class Categories extends Component {
  constructor(){
    super()
    this.state = {
      contentsList : ["Editorial","Nature","Architecture","Fashion","Wallpapers","Interiors","History","Athletics"],
      selected: "Editorial",
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
          {this.state.contentsList.map((item, i) => <b key={item} onClick={() => this.handleClick(item)}
          className={`z-40 hover:cursor-pointer h-10 inline-block
          ${this.state.selected === item && "border-b-2 border-purple-900"} py-1 px-2`}>
            {item}
          </b>)}
        </div>
      </div>
      <div className='w-full'>{this.props.children}</div>
      </>
    )
  }
}

export default Categories