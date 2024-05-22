import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';


function Loginpage() {
    const [details, setDetails] = useState({
        name: '',
        password: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const Clicked = async(e) => {
        e.preventDefault(); 
       
        const {data} = await axios
        .post('http://192.168.2.111:3000/empDetails/login-empDetails/', details)
    
        console.log(data);
    };

    return (
      <div className='card-container'>
      <div className="card">
      <h1>Login Page</h1>
      <form >
          <label>User Name</label>
          <input  type='text'  name='name'  placeholder='Enter Email'  value={details.name}  onChange={changeHandler}  /><br />
          <br></br>
          <label>Password</label>
          <input  type='password'  name='password'  placeholder='Enter password'  value={details.password}  onChange={changeHandler}  /><br />
          <br></br>
          <button onClick={Clicked}>Submit</button>
      </form>
  </div>
  </div>
    );
}

export default Loginpage;
