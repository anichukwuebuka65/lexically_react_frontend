import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const withNavigate = (Component) => {
    
    return function ParentComponent(props){
       const [params , ] = useSearchParams()
       const {id} = useParams()
       const navigate = useNavigate()

        return (
            <Component {...props} navigate={navigate} id={id} token={params.get("token")} />
        )
    }
 
}

export default withNavigate