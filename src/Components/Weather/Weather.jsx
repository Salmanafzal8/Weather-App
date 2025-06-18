import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa";
import clearIcon from "../../../public/clearIcon.png";
import cloudy_icon from "../../../public/Cloudy_icon.png";
import rain_icon from "../../../public/rain_icon.png";
import thunder_icon from "../../../public/thunder_icon.png";
import snow_icon from "../../../public/snow_icon.png";

const Weather = () => {
  const [city, setCity] = useState("Islamabad"); 
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": cloudy_icon,
    "04n": cloudy_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunder_icon,
    "11n": thunder_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const fetchWeather = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const iconCode = data.weather[0].icon;
      const icon = allIcons[iconCode] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log("Error fetching weather:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeather("Islamabad");
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <>
      <div className="h-[80%] rounded-2xl border bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l hover:from-blue-500 hover:to-red-500 w-[25%] flex flex-col items-center ">
        <div className="flex mt-8 gap-3 justify-center items-start ">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)
            }
            placeholder="Search"	
            className="bg-white p-4 h-9 w-[100%] outline-0 rounded-4xl text-black"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center hover:bg-blue-400 hover:text-amber-50 rounded-full h-9 w-11 bg-white"
          >
            <CiSearch className="size-8 p-1 opacity-80" />
          </button>
        </div>

        {weatherData && (
          <>
            <div className="flex items-center mt-10 flex-col ">
              <img className="h-30 w-30" src={weatherData.icon} alt="weather icon" />
              <div className="flex flex-row items-center mt-4">
                <p className="text-white font text-[40px]">
                  {weatherData.temperature} &deg;
                </p>
                <p className="text-[30px] font mt-3 text-white">C</p>
              </div>
              <p className="text-white text-[20px]">{weatherData.location}</p>
            </div>

            <div className="flex justify-around gap-[60px] mt-18">
              <div className="flex items-center gap-1 flex-row">
                <LuWaves className="text-white text-[40px]" />
                <div>
                  <p className="text-white text-[20px]">{weatherData.humidity}%</p>
                  <p className="text-white text-[13px]">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-row">
                <FaWind className="text-white text-[35px]" />
                <div>
                  <p className="text-white text-[20px]">{weatherData.windSpeed}km/h</p>
                  <p className="text-white text-[13px]">Wind speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;


// import React, { useState } from 'react'

// const Weather = () => {
//   const [city ,setCity] = useState("Islamabad")
//   const [weatherData,setWeatherData] = useState(null)


//  const weatherApi = async (cityname) =>{
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}")
//     .then((response) => response.json())
//     .then((data)=> 
//             console.log (data)

        
        
//         setWeatherData({
//             location :data.name
//             humidity : data.humidity
//             windspeed : data.wind.speed
//             temp : Math.floor(data.temp)
//         })  )
//     .catch((error)=> console.log("Erorr in fetching weather api:",error))
//  }

//   return (
//     <div>
//       <button onClick={weatherApi}></button>
//     </div>
//   )
// }

// export default Weather
