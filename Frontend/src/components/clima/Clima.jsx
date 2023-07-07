import { useEffect, useState } from "react";
import axios from "axios";
import "./Clima.css";

const Clima = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [city, setCity] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const obtenerDatosClima = async (latitude, longitude) => {
      const appID = "f1dbeae1";
      const key = "24912f94bbca4eb7eda328bdee063116";
      const url = `http://api.weatherunlocked.com/api/current/${latitude},${longitude}?app_id=${appID}&app_key=${key}&lang=es`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
      }
    };

    const obtenerHoraAmanecerAtardecer = async (latitude, longitude) => {
      const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
      try {
        const response = await axios.get(url);
        setSunrise(response.data.results.sunrise);
        setSunset(response.data.results.sunset);
      } catch (error) {
        console.error(
          "Error al obtener la hora del amanecer y atardecer:",
          error
        );
      }
    };

    const obtenerCiudad = async (latitude, longitude) => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const response = await axios.get(url);
        const address = response.data.address;
        if (address) {
          const cityName =
            address.city || address.town || address.village || address.hamlet;
          setCity(cityName);
        }
      } catch (error) {
        console.error("Error al obtener la ciudad:", error);
      }
    };

    const obtenerUbicacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            obtenerDatosClima(latitude, longitude);
            obtenerHoraAmanecerAtardecer(latitude, longitude);
            obtenerCiudad(latitude, longitude);
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error);
          }
        );
      } else {
        console.error("Geolocalización no soportada por el navegador.");
      }
    };

    obtenerUbicacion();
  }, []);

  useEffect(() => {
    if (sunrise && sunset) {
      const now = new Date();
      const sunriseTime = new Date(sunrise);
      const sunsetTime = new Date(sunset);
      if (now > sunriseTime && now < sunsetTime) {
        setTimeOfDay("dia");
      } else {
        setTimeOfDay("noche");
      }
    }
  }, [sunrise, sunset]);

  useEffect(() => {
    const obtenerHoraFechaActual = () => {
      const now = new Date();
      const hora = now.getHours();
      const minutos = now.getMinutes();
      const segundos = now.getSeconds();
      const dia = now.getDate();
      const mes = now.getMonth() + 1;
      const año = now.getFullYear();
      setCurrentTime(`${hora}:${minutos}:${segundos}`);
      setCurrentDate(`${dia}/${mes}/${año}`);
      setCurrentDay(getCurrentDayOfWeek(now));
    };

    const interval = setInterval(obtenerHoraFechaActual, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCurrentDayOfWeek = (date) => {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  return (
    <div className="tiempo">
      {weatherData && (
        <div className={timeOfDay}>
          <div>
            {userLocation && (
              <div className="city">
                <p>{city}</p>
              </div>
            )}
            {currentTime && currentDate && currentDay && (
              <div className="time">
                <p className="reloj">{currentTime}</p>
                <p className="day">
                  {currentDay} {currentDate}
                </p>
              </div>
            )}
            <div className="datos">
              <p>{weatherData.temp_c}°C</p>
              <p>{weatherData.wx_desc}</p>
            </div>

            <div className="wind">
              <p>Viento: {weatherData.windspd_kmh} km/h</p>
              <p>Humedad: {weatherData.humid_pct}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clima;
