import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const DeleteProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const data2 = searchParams.get('data');
  const navigate = useNavigate();

  const handleDelete = () => {
    const condition = { profileName: data2 };
  
    fetch(`/deleteProfile?condition=${condition.profileName}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Document deleted successfully');
        } else {
          throw new Error('Error deleting document');
        }
      })
      .catch((error) => {
        console.error('Error deleting document:', error);
        // Handle the error and display an error message to the user if needed
      });
  };
  

  return (
    <div>
      <h1>Next Page</h1>
      <form onSubmit={handleDelete}>
        <button type="submit">Confirm Delete</button>
      </form>
      <p>{data2}</p>
    </div>
  );
};

export default DeleteProfile;
