import "./SignUp.css"
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser} from '../../redux-toolkit/features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useState } from "react";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // const existingEmail = useSelector(state => state.users.usersData).find(user => user.email === formData.email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (existingEmail) {
      // toast.error('Email already exists');
    // } else {
      dispatch(createNewUser({ ...formData, userId: uuidv4() }));
      // console.log(user)
      // if(user){
        navigate("/signin");
      // }
      // dispatch(register({ ...formData, userId: uuidv4() }));
      // toast.success('Account created successfully!');
    // }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form" autoComplete='off'>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
