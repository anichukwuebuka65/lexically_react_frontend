import React, { Component } from 'react'
import withNavigate from './withNavigate'

export class SignIn extends Component {

  constructor() {
    super()
    this.state = {
       name: "",
       error:""
    }
    this.username = localStorage.getItem("lexically__name")
  }

  componentDidMount(){
    if (this.props.token === "error") {
      return this.setState(state => ({...state, error:"something went wrong, try again"}))
    } 
  }

  handleFileChange = (event) => {
    this.setState(state => ({
      ...state,
    name: event.target.value }))
  }
  render() {
    const {name, error} = this.state

    return (
      <form action={name ? "http://localhost:5000/redirect" : "#"}>
        {error && <p className='text-sm italic text-center block'>{error}</p>}
        <input onChange={this.handleFileChange} value={name} type="text" className='w-2/3 mx-auto block mb-3 placeholder:tracking-wide placeholder:italic focus:outline-none rounded-md p-2 border' 
        placeholder="Your unsplash username"/>
        <p className='text-center mb-3'>
          <button type="submit" onClick={() =>localStorage.setItem("lexically__name", this.state.name)}
          className='font-semibold border-2 border-zinc-500 rounded-md tracking-wide py-1 px-3'>Sign In</button> 
          <em> to upload your photos</em>
        </p>
      </form>   
    )
  }
}

export default withNavigate(SignIn)