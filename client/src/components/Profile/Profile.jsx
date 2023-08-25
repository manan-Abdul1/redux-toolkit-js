import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const userId=useSelector(state=>state.users.user.id)
  const userEmail=useSelector(state=>state.users.user.email)
  const userName=useSelector(state=>state.users.user.username)
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ymnrcjst');

    try {
      // First, upload the image to Cloudinary
      const uploadUrl = 'https://api.cloudinary.com/v1_1/dipdjdhic/image/upload';
       await axios.post(uploadUrl, formData);
     
    } catch (error) {
      console.error('Error uploading image and updating user:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      <form className="profile-image-container" onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="image"
          type="file"
          name="image"
          accept=".jpeg, .jpg, .png"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Profile;
