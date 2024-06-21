import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../../api';
import Header from '../Header/Header';
import WeatherChart from '../WeatherChart';
import CityDropdown from '../CityDropdown/CityDropdown';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import RefreshButton from '../RefreshButton/RefreshButton';
import './Dashboard.css';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherData(selectedCity);
        setWeatherData({
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          wind_direction: data.wind.deg, 
          visibility: data.visibility, 
        });
      } catch (error) {
        setError('Error fetching the weather data');
        console.error('Error fetching the weather data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);


  const handleRefresh = () => {
    setSelectedCity(selectedCity); 
  };

  return (
    <div className="dashboard">
      <Header />
      <CityDropdown cities={cities} selectedCity={selectedCity} onChange={setSelectedCity} />
      <RefreshButton onRefresh={handleRefresh} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <WeatherChart data={[
            { name: 'Temperature', temp: weatherData.temp },
            { name: 'Feels Like', temp: weatherData.feels_like },
            { name: 'Min Temp', temp: weatherData.temp_min },
            { name: 'Max Temp', temp: weatherData.temp_max },
          ]} />
          <WeatherDetails data={weatherData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
