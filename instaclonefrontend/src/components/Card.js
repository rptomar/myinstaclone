import React, { useState } from 'react'

const Card = ({personDetails:{name,location,likes,postImage,description,date}}) => {
    console.log("date",date)
    const[serverlike,setServerlike]=useState(0)
    function increaseLike(){
        setServerlike((pre)=>pre+1)
    }
  return (
    <div className='Card-container'>
    <div className='Card-top-bar'>
        <div className='top-left'>
            <h4 className='text helvetica-font'>{name.slice(0,1).toUpperCase()+name.slice(1)}</h4>
            <p className='blur-text'>{location}</p>
        </div>
        <div className='top-right'>
            <div className='series-dot-button-container'>
                <div className='series-btn-child'></div>
                <div className='series-btn-child'></div>
                <div className='series-btn-child'></div>
            </div>
        </div>
    </div>
    <div className='image-container'>
       <img  alt="images" src={postImage}/>
    </div>
    <div className='emoji-logo-container'>
        <div className='heart-comment-container'>
            <div className='heart heart-css' onClick={()=>increaseLike()} >
                <div className='heart-wrapper'>
                <img className='heart-image' alt="heart" src={require("../assets/logo/heart.png")}/>
                </div>
            </div>
            <div className='bottom-logo'>
                <div className='heart-wrapper'>
                <img className='heart-image' alt="logo" src={require("../assets/logo/share.png")}/>
                </div>
            </div>
        </div>
        <div className='date'>{new Date(date).getDate()} {new Date(date).toDateString().slice(4,7)} {new Date(date).getFullYear()}</div>
    </div>
    <div className='likes' >
            <h5  className='blur-text'> {likes===0?((serverlike===0)?"Tap to like":serverlike):`${likes} Likes`}</h5>
    </div>
    <div className='likes description'>
        <p className='text para helvetica-font'>{description}</p>
    </div>
    </div>
  )
}

export default Card