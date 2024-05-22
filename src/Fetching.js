import './Fetching.css'
import React, { useEffect, useState } from 'react'
function Fetching() {
    const [date,setDate]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:2000/details")
        .then(res=>res.json())
        .then(data=>{
            setDate(data);
        })
        .catch((err)=>console.log("error"))
       
    },[]);
   
  return (
    <>
        {date.map(function(data){
            return(
                <div  >
                    <ul  className='mydiv'>
                    <li>Name:{data.names}</li>
                    <li >Age:{data.age}</li>
                    <li >Hobbies:{data.hobbies.join(",")}</li>
                    </ul>
                </div>
            )

        })}
        
    </>
  )
}

