import React from 'react'
import axios from 'axios'
const getting=()=>{

    axios
    .get('http://localhost:2000/details')
    .then(res=>console.log(res))
}

function Radio() {
  return (
    <div>
      <button onClick={getting}>
            get 
      </button>
    </div>
  )
}

export default Radio
