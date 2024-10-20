import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ProductDetails() {



  let {id} = useParams(); 
  
  const [details, setDetails] = useState(null) 

  function getProductDetails(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`) 

    .then( ({data})=>{
      console.log(data.data);
      setDetails(data.data);
    } )

    .catch( ()=>{} )

  }

  useEffect( ()=>{
    getProductDetails();
  } , [])


  
  return (
    <div className="d-flex my-2">
      <div className='w-25'>
        <img src={details?.imageCover} alt={details?.title} className='w-100' />
      </div>

      <div className='w-50 justify-content-center align-content-center'>
        <h1>{details?.title}</h1>
        <p>{details?.description}</p>
        <p>{details?.category.name}</p>
        
        <div className="d-flex justify-content-between my-2">
        <span>{details?.price} EGP</span>
        <span>{details?.ratingsQuantity}<i className="fas fa-star text-warning"></i></span>
        </div>
        <button className='btn bg-info text-white p-2 w-100'>Add To Cart</button>
      </div>

    </div>
  )
}
