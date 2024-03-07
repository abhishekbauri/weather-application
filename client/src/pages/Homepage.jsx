import Layout from "../components/layout/Layout";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherCloudy } from "react-icons/ti";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";
import Forecast from "../components/card/Forecast";

const Homepage = () => {
  const [city, setCity] = useState("");
  let [currentCity, setCurrentCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [units, setUnits] = useState("metric"); // metric or imperial
  const [loading, setLoading] = useState(true);
  const [foreCast, setForeCast] = useState(null);
  const [foreCastLoader, setForeCastLoader] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    setCurrentCity(city);
  };

  useEffect(() => {
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLongitude(longitude);
          setLatitude(latitude);
        },
        (error) => {
          toast.error(`Error getting location: ${error.message}`);
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }

    const findWeatherWithCoordination = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `/api/v1/weather/current-weather-lat-lon`,
          { units, lat: latitude, lon: longitude },
        );
        setWeatherData(res?.data?.weatherData);
        toast.success(res?.data?.message);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    const fiveDayForeCastWithCoordination = async () => {
      try {
        setForeCastLoader(true);
        const response = await axios.post(
          `/api/v1/weather/five-day-forecast-lat-lon`,
          { units, lat: latitude, lon: longitude },
        );
        setForeCast(response.data.weatherData.list);
        toast.success(response?.data?.message);
        setForeCastLoader(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setForeCastLoader(false);
      }
    };

    const fiveDayCityForecast = async () => {
      try {
        setForeCastLoader(true);
        const response = await axios.post(
          `/api/v1/weather/five-day-forecast-city`,
          { city: currentCity, units },
        );
        setForeCast(response.data.weatherData.list);
        setForeCastLoader(false);
      } catch (error) {
        setForeCastLoader(false);
        toast.error(error.response.data.message);
      }
    };

    const findCityWeather = async () => {
      fiveDayCityForecast();
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/v1/weather/current-weather-city`,
          { city: currentCity, units },
        );
        setWeatherData(response?.data?.weatherData);
        setLoading(false);
        toast.success(response?.data?.message);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    };

    if (latitude && longitude && currentCity === "") {
      findWeatherWithCoordination();
      fiveDayForeCastWithCoordination();
    }

    if (currentCity !== "") {
      findCityWeather();
    }
  }, [latitude, longitude, units, currentCity]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row pt-4 pb-4 d-flex justify-content-center">
          <div className=" col-md-4">
            <form
              className=" d-flex justify-content-center flex-column p-2"
              onSubmit={submitHandler}
            >
              <input
                type="text"
                name="search"
                id="serach"
                placeholder="Enter your city name"
                className="w-100 p-3 rounded-5 mb-3"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                autoComplete="off"
              />
              <button className="btn btn-secondary rounded-5">Search</button>
            </form>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-outline-warning d-flex justify-content-center align-items-center "
                onClick={() => setUnits("metric")}
              >
                <TbTemperatureCelsius size={24} />
              </button>
              <button
                className="btn btn-outline-info d-flex justify-content-center align-items-center"
                onClick={() => setUnits("imperial")}
              >
                <TbTemperatureFahrenheit size={24} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader title="Please wait..." />
        ) : (
          <div className="row mt-2 d-flex justify-content-center flex-wrap align-items-center">
            <div className="mt-2 rounded-4 weather-details">
              <h2 className="text-center text-capitalize">
                {weatherData?.name}
              </h2>
              <p>
                <FaTemperatureLow size={24} /> Temp : {weatherData?.main?.temp}°
              </p>
              <p>
                <FaTemperatureHigh size={24} /> Feels like:{" "}
                {weatherData?.main?.feels_like}°
              </p>
              <p className="text-capitalize">
                <TiWeatherCloudy size={24} />
                Description: {weatherData?.weather[0]?.description}
              </p>
            </div>
          </div>
        )}

        {foreCastLoader ? (
          <Loader title="Please wait..." />
        ) : (
          <div className="row pt-5 pb-5 d-flex justify-content-center align-items-center flex-wrap gap-2">
            <h2 className=" text-center text-light">Weather ForeCast</h2>
            {foreCast?.map((ele, index) => (
              <Forecast key={index} {...ele} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
