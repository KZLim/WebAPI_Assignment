import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [profileName, setProfileName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass the profile name to the next page
    navigate('/dashboard', { state: { profileName } });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          background: 'gray',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Profile Option</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Profile Name:
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                boxSizing: 'border-box',
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              display: 'block',
              width: '100%',
              height: '35px',
              marginTop: '10px',
              padding: '5px',
              borderRadius: '10px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              border: 'none',
            }}
          >
            Use this profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
