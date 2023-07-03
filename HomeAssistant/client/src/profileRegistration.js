import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AccountRegistration = () => {
    const [profileName, setProfileName] = useState('');
    const [reside, setReside] = useState('');
    const [category, setCategory] = useState('');  
    const [favPlayer, setFavPlayer] = useState('');  


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userp = {
            profileName,
            reside,
            category,
            favPlayer,
        };

        axios
        .post('/formdata', userp, {
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log('Form data saved:', response.data);
            // Handle success
        })
        .catch((error) => {
            console.error('Error saving form data:', error);
            // Handle error
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '20px', // Add padding to the container
            }}
        >
        <div
            style={{
            background: 'gray',
            padding: '20px',
            borderRadius: '15px',
            width: '400px', // Adjust the width of the form container
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Profile Registration</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                    <label style={{ display: 'block' }}>Profile Name:</label>
                    <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        style={{
                            width: '100%',
                            height: '30px', // Increase the height of the input field
                            borderRadius: '10px',
                            border: 'none',
                            padding: '5px 10px',
                            textAlign: 'center', // Align the field content in the center
                            boxSizing: 'border-box', // Include padding and border in the specified width
                        }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <label style={{ display: 'block' }}>Resides:</label>
                        <input
                        type="text"
                        value={reside}
                        onChange={(e) => setReside(e.target.value)}
                        style={{
                            width: '100%',
                            height: '30px', // Increase the height of the input field
                            borderRadius: '10px',
                            border: 'none',
                            padding: '5px 10px',
                            textAlign: 'center', // Align the field content in the center
                            boxSizing: 'border-box', // Include padding and border in the specified width
                        }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <label style={{ display: 'block' }}>News Category:</label>
                        <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '100%',
                            height: '30px', // Increase the height of the input field
                            borderRadius: '10px',
                            border: 'none',
                            padding: '5px 10px',
                            textAlign: 'center', // Align the field content in the center
                            boxSizing: 'border-box', // Include padding and border in the specified width
                        }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <label style={{ display: 'block' }}>Favourite Player:</label>
                        <input
                        type="text"
                        value={favPlayer}
                        onChange={(e) => setFavPlayer(e.target.value)}
                        style={{
                            width: '100%',
                            height: '30px', // Increase the height of the input field
                            borderRadius: '10px',
                            border: 'none',
                            padding: '5px 10px',
                            textAlign: 'center', // Align the field content in the center
                            boxSizing: 'border-box', // Include padding and border in the specified width
                        }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '10px',
                        border: 'none',
                        backgroundColor: 'dodgerblue',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        marginTop: '10px', // Add margin-top for spacing
                        }}
                    >
                    Submit
                    </button>
                    <br/><br/>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link
                            to="/profileOption"
                            style={{
                            color: '#333',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            background: '#f5f5f5',
                            borderRadius: '10px',
                            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease-in-out, color 0.3s ease-in-out',
                            }}
                        >
                            Use Existing Profile
                        </Link>
                    </div>               
                </form>
            </div>
        </div>
    );
};

export default AccountRegistration;
