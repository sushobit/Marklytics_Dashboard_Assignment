import axios from 'axios';

const API_KEY = "bebd126d8b2166a5d0ccb126b6c6afa4";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather?q=${city},IN&appid=${API_KEY}&units=metric`);
      return response.data;
    } catch (error) {
      console.error('Error fetching the weather data', error);
      throw error;
    }
  };