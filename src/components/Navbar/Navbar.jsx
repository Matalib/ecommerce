import React, { useContext, useState } from 'react'
// import img from '../../assets/images/freshcart.webp'
import { NavLink } from 'react-router-dom'
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  let navigate = useNavigate()
  let {isLogin} = useContext(userContext)
  function logOut(){
    localStorage.removeItem('userToken');
    navigate('/register')
    setLogin (null);  //modify isLogin from token >>> null
   
  }
  return (
    <nav className='bg-dark-subtle px-3 shadow-sm'>
    <div className='d-flex flex-column flex-lg-row justify-content-between'>
        <div className='logo d-flex flex-column flex-lg-row'>
          
          {isLogin ?
          <ul className='d-flex flex-column flex-lg-row list-unstyled p-3'>
          <li><NavLink to ={'home'} className='text-decoration-none p-2'>Home</NavLink></li>
          <li><NavLink to ={'products'} className='text-decoration-none p-2'>Products </NavLink></li>
          <li><NavLink to ={'carts'} className='text-decoration-none p-2'>Carts</NavLink></li>
          <li><NavLink to ={'brands'} className='text-decoration-none p-2'>Brands</NavLink></li>
          
          </ul>: null
          }
          
        </div>

      <div className='social'>
      <ul className='d-flex flex-column flex-lg-row p-3 list-unstyled'>
      {!isLogin ? //not token
        <>
          <li><NavLink to={'register'} className='text-decoration-none p-2'>Register</NavLink></li>
          <li><NavLink to={'login'} className='text-decoration-none p-2'>Login</NavLink></li> 
        </>:
          <li className='px-2'><span onClick={()=>{logOut()}}>Logout</span></li>

      }  
          
      </ul>
      </div>
 
    </div>

  </nav>
    
  )
}
