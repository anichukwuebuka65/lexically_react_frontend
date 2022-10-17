import React, { Component } from 'react'

class Categories extends Component {
  constructor(){
    super()
    this.state = {
      contentsList : ["Editorial","Nature","Architecture","Fashion","Wallpapers","Interiors","History","Athletics"],
      selected: "Editorial",
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(item) {
    this.setState(state => ({...state, selected: item}))
    this.props.handleSearch(item)
  }

  render() {
    return (
      <div className='flex justify-center bg-slate-200'>
        <div  className='justify-center'>
          {this.state.contentsList.map((item, i) => <b key={item} onClick={() => this.handleClick(item)}
          className={`z-40 hover:cursor-pointer h-10 inline-block
          ${this.state.selected === item && "border-b-2 border-purple-900"} py-1 px-2`}>
            {item}
          </b>)}
        </div>
      </div>
    )
  }
}

export default Categories