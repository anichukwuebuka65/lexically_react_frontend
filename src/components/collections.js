import React, { Component } from 'react'
import { unsplash } from './home/unsplash'
import Photos from './photos'

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
    return (
      <>
        <Photos photos={this.state.collections} link="collections"/>
      </>
    )
  }
}

export default Collections