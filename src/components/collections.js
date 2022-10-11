import React, { Component } from 'react'
import { unsplash } from './home/unsplash'

export class Collections extends Component {
    constructor(props) {
      super(props)
      this.state = {
        collections: []
      }
    }

    componentDidMount() {
        unsplash.collections.list({perPage: 15})
        .then((result) => {
            this.setState(state => ({...state, collections: result.response.results}))
        })
        .catch(err => console.log(err))
    }

  render() {
    console.log(this.state.collections)
    return (
      <div className='grid grid-cols-3 gap-3'>
        {this.state.collections.map(item => (
        <img src ={item.cover_photo.urls.regular}/>
        ))}
      </div>
    )
  }
}

export default Collections