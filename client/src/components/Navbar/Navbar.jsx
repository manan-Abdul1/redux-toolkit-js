import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css'; 
import { toast } from 'react-hot-toast';
import { resetTodoList } from '../../redux-toolkit/features/todolist/todoSlice';
import { logout } from '../../redux-toolkit/features/users/userSlice';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const usersData = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

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
      <div className="logo">
        Logo
      </div>
      <div className="profile">
        <div className="username" onClick={handleToggleDropdown}>
          {usersData.username}<i className="fas fa-caret-down"></i>
        </div>
        {showDropdown && (
          <div className="dropdown">
            <NavLink to='/profile' className="dropdown-link">Profile</NavLink>
            <div className="email">
              <strong>Email:</strong> {usersData.email}
            </div>
            <div className="signout" onClick={handleSignOut}>
              Sign Out
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
