import React, { Component } from 'react'
import { unsplash } from '../home/unsplash'

export class Collections extends Component {
    constructor() {
      super()
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
        {this.props.children}
        {this.props.render(this.state.collections)}
      </>
    )
  }
}

export default Collections