import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { CLOUDNIARY_IMG_URL } from '../../utils/serverUrl';
import { apiRequest } from '../../utils/axios';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const userId = useSelector(state => state.users.user.id);
  const userEmail = useSelector(state => state.users.user.email);
  const userName = useSelector(state => state.users.user.username);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ymnrcjst');

    try {
      const uploadResponse = await axios.post(CLOUDNIARY_IMG_URL, formData);

      const userUpdateResponse = await apiRequest(`user/updateUser`, 'put', {
        username: username,
        email: email,
        imageUrl: uploadResponse.data.secure_url,
        userId
      });

      if (userUpdateResponse.status === 200) {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error('Error uploading image and updating user:', error);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <form className="profile-form" onSubmit={handleUpload}>
          <div className="image-profile-container">
            <div className="image-preview">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="Preview" className="image" />
              ) : (
                <div className="add-image-label">Add Image</div>
              )}
            </div>
            <input
              id="image"
              type="file"
              name="image"
              accept=".jpeg, .jpg, .png"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <input
            className="profile-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="profile-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="profile-button" type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
