import React from 'react'
import {Link} from 'react-router-dom';
import { ReactComponent as BrandIcon } from "../assets/logo/icon.svg";

const Navbar = () => {
  return (
    <div className='nav-position'>
    <div className='nav-bar'>
      <div className='wraping-nav'>

      <div className='nav-left'>
            <div className='logo'>
              <div className='logo-wrapper'>
              <BrandIcon className="svg"/>
              </div>
            </div>
            <h2>InstaClone</h2>
        </div>
        <Link className='link-container nav-right' to="/PostForm"><img alt="postImage" src={require("../assets/logo/camera.png")}/></Link>
      </div>
    </div>
    </div>
  )
}

export default Navbar