import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css'; 
import { toast } from 'react-hot-toast';
import { resetTodoList } from '../../redux-toolkit/features/todolist/todoSlice';
import { logout } from '../../redux-toolkit/features/users/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const usersData = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(resetTodoList());
    toast.success("Logged out!");
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={()=>navigate('/')}>
        Logo
      </div>
      <div className="profile">
        <div className="username" onClick={handleToggleDropdown}>
          {usersData.username}<i className="fas fa-caret-down"></i>
        </div>
        {showDropdown && (
          <div className="dropdown">
            <NavLink to='/profile' className="dropdown-link">Profile</NavLink>
            {/* <div className="email">
              <strong>Email:</strong> {usersData.email}
            </div> */}
            <div className="signout" onClick={handleSignOut}>
            <i className="fa-solid fa-right-from-bracket "></i>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
