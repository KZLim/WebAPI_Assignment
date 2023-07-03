import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfileForm = () => {
  const [readdb, setFormData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [mealsData, setMealData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [playerData, setPlayersData] = useState(null);
  const location = useLocation();
  const { profileName } = location.state;

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const condition = { profileName: profileName };
      const queryString = new URLSearchParams(condition).toString();
      const response = await fetch(`/readdb?${queryString}`);

      if (response.ok) {
            const data = await response.json();
            setFormData(data);
            console.log('Form data retrieved:', data);

            const apikey = 'a48ce955504b4ad8b0401218231206';
            const location = data.reside;
			      const category = data.category;
            const player = data.favPlayer;


            const query1 = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no&days=5`;
            axios.get(query1).then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error('Error retrieving weather data:', error);
            });

            const query2 = 'https://www.themealdb.com/api/json/v1/1/random.php';
            axios.get(query2).then((secondResponse) => {
                setMealData(secondResponse.data.meals[0]);
                console.log('Second API response:', secondResponse.data);
            })
            .catch((secondError) => {
                console.error('Error retrieving second API data:', secondError);
            });

            const query3 = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=0a2378092b2740c498334a128df5dfa3`;
            axios.get(query3).then((thirdResponse) => {
                setNewsData(thirdResponse.data.articles[0]);
                console.log('Third API response:', thirdResponse.data);
            })
            .catch((thirdError) => {
                console.error('Error retrieving third API data:', thirdError);
            });

            const query4 = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${player}`;
            axios.get(query4).then((fourthResponse) => {
                setPlayersData(fourthResponse.data.player[0]);
                console.log('Fourth API response:', fourthResponse.data);
            })
            .catch((fourthError) => {
                console.error('Error retrieving fourth API data:', fourthError);
            });

        } else {
            console.error('Error retrieving form data');
        }
    } catch (error) {
      console.error('Error retrieving form data:', error);
    }

  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
        This Profile Details
        </h2>
        {readdb ? (
          <div>
            <p>
              <strong>Profile Name:</strong> {readdb.profileName}
            </p>
            <p>
              <strong>Reside:</strong> {readdb.reside}
            </p>
            <p>
              <strong>News Category:</strong> {readdb.category}
            </p>
            <p>
              <strong>Favorite Football Player:</strong> {readdb.favPlayer}
            </p>
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}
      </div>
  
      <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
          Weather Information
        </h2>
        {weatherData ? (
          <div>
            <p>
              <strong>Location:</strong> {weatherData.location.name}
            </p>
            <p>
              <strong>Country:</strong> {weatherData.location.country}
            </p>
            <p>
              <strong>Temperature:</strong> {weatherData.current.temp_c} °C
            </p>
            <p>
              <strong>Condition:</strong> {weatherData.current.condition.text}
            </p>
            <p>
              <strong>UV Index:</strong> {weatherData.current.uv}
            </p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
  
      <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
          Today's Meals Recommendation
        </h2>
        {mealsData ? (
          <div>
            <p>
              <strong>Meal Name:</strong> {mealsData.strMeal}
            </p>
            <p>
              <strong>Origin:</strong> {mealsData.strArea}
            </p>
            <p>
              <strong>Instructions:</strong> {mealsData.strInstructions}
            </p>
			<p>
				<strong>URL:</strong>{" "}
				{mealsData.strSource ? (
					<a href={mealsData.strSource} target="_blank" rel="noopener noreferrer">
					{mealsData.strSource}
					</a>
				) : (
					"None"
				)}
            </p>
          </div>
        ) : (
          <p>Loading meals data...</p>
        )}
      </div>
  
      <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
          News Information
        </h2>
        {newsData ? (
          <div>
            <p>
              <strong>Title:</strong> {newsData.title}
            </p>
            <p>
              <strong>Author:</strong> {newsData.author}
            </p>
            <p>
              <strong>Published At:</strong> {newsData.publishedAt}
            </p>
            <p style={{ wordBreak: 'break-all' }}>
              <strong>URL:</strong>
              <a href={newsData.url} target="_blank" rel="noopener noreferrer">
                {newsData.url}
              </a>
            </p>
          </div>
        ) : (
          <p>Loading news data...</p>
        )}
      </div>
  
      <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
          Favorite Football Player
        </h2>
        {playerData ? (
          <div>
            <p>
              <strong>Name:</strong> {playerData.strPlayer}
            </p>
            <p>
              <strong>Alternative Name:</strong> {playerData.strPlayerAlternate}
            </p>
            <p>
              <strong>DOB:</strong> {playerData.dateBorn}
            </p>
            <p>
              <strong>Nationality:</strong> {playerData.strNationality}
            </p>
            <p>
              <strong>Status:</strong> {playerData.strStatus}
            </p>
          </div>
        ) : (
          <p>Loading football player data...</p>
        )}
      </div>
	  <div
        style={{
          background: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      	>
			<h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
			Profile Deletion Panel
			</h2>

			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Link
					to={`/deleteProfile?data=${encodeURIComponent(readdb.profileName)}`}
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
				Delete My Profile
				</Link>
    		</div>
      	</div>
    </div>
  );
};  

export default ProfileForm;
