import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux-toolkit/features/users/userSlice';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  const usersData = useSelector(state => state.users.SignedInCredentials);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    dispatch(logout());
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
          {usersData.username}<i className="fa-solid fa-caret-down"></i>
          {showDropdown && (
            <div className="dropdown">
              <div className="email">
                <strong>Email:</strong> {usersData.email}
              </div>
              <div className="signout" onClick={handleSignOut}>
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
