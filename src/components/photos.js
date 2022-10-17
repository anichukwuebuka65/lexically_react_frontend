import React from "react"
import Photo from "./home/photo"

const Photos = React.forwardRef(({photos, link}, Ref) => {

    function renderPhotosByDiv (div, items,incrementBy) {
        const j = items.length
        const newArray = []
        for(let i = div; i < j; i = i + incrementBy ){
            newArray.push(items[i])
         }
        return newArray 
    }

    if(photos.length === 0 ) {
        return (
            <div className='w-1/2 mx-auto mt-14'>
                <div className=' mx-auto h-10 w-10 animate-loading rounded-full border-4 border-y-blue-500'></div>
            </div>
            )
    }

    if(window.innerWidth > 950) {
        const divPhotos1 = renderPhotosByDiv(0,photos,3).map((item,i) => {
            if(i >= (photos.length /3) - 3) {
               return (<Photo ref={Ref} key={item.id} link={link} values={item}/>)
            }
        return <Photo key={item.id} link={link} values={item}/>
        })
        const divPhotos2 = renderPhotosByDiv(1,photos,3).map(item => <Photo key={item.id} link={link} values={item}/>)
        const divPhotos3 = renderPhotosByDiv(2,photos,3).map(item => <Photo key={item.id} link={link} values={item}/>)

        return (
            <div className='md:grid md:grid-cols-3 gap-2'>
                <div>{divPhotos1}</div>
                <div>{divPhotos2}</div>
                <div>{divPhotos3}</div> 
            </div>
        )

    } else {
        const divPhotos1 = renderPhotosByDiv(0,photos,2).map((item, i) => {
            if(i >= (photos.length / 2) - 2) {
            return (<Photo ref={Ref} key={item.id} link={link} values={item}/>)
            }
            return <Photo key={item.id} link={link} values={item}/>
        })
        const divPhotos2 = renderPhotosByDiv(1,photos,2).map(item => <Photo key={item.id} link={link} values={item}/>)

        return (
            <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
            <div>{divPhotos2}</div>
            <div>{divPhotos1}</div>
            </div>
        )
    }

   
}
)

export default Photos