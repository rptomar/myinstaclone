import React,{useEffect, useState} from 'react'
import { Card, Navbar } from '../../components'

const PostviewPage = () => {
  const[users,setusers]=useState([])
  const[emptydata,setEmptyDate]=useState(false)
  useEffect(()=>{
    console.log("im fetching")
    fetch("https://instaclonebackendproject.herokuapp.com/posts")
    .then(res=>{
      return res.json()
    }).then((data)=>{
        if(data.length===0){
          setEmptyDate(true)
        }else{
          setusers(()=>[...data])
        }
    })
  },[])

  return (
    <div>
    <Navbar/>
    <br/>
    <br/>
    {users?.map((personDetails,index)=>{
     return <Card key={index} personDetails={personDetails}/>
    })
    }
    <br/>
    {emptydata && <p>No post...Try to upload images by clicking top right icon 📷</p>}
    </div>
  )
}

export default PostviewPage

