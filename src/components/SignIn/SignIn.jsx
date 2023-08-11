import React, { useState } from 'react';
import "./SignIn.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux-toolkit/features/users/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state=>state.users.usersData)


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userData.find(user => user.email === formData.email && formData.password)
    console.log(user)
    if(user){
      dispatch(signIn(user)); 
      navigate("/")
      
    }
    else{
      console.log("Invalid Credentials")
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form" autoComplete='off'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Sign In</button>
      <p onClick={()=>navigate('/signup')} style={{cursor:"pointer"}}>Create new accout? Register</p>
      </form>
    </div>
  );
};

export default SignIn;
