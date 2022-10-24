import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const withNavigate = (Component) => {
    
    return function ParentComponent(props){
        const [searchParams] = useSearchParams()
       const {id} = useParams()
       const navigate = useNavigate()

        return (
            <Component {...props} navigate={navigate} id={id} query={searchParams.get("open")}/>
        )
    }
 
}

export default withNavigate