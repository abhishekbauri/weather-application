import axios from "axios";

export const currentCityWeatherController = async (req, res) => {
  try {
    const { city, units } = req.body;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=${units}`,
    );
    const weatherData = response.data;
    res.status(200).json({
      status: true,
      message: "Current weather fetched successfully!",
      weatherData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to get the weather for given location!",
      error: error?.message || "Something went wrong!",
      error,
    });
  }
};

export const currentLatLongWeatherController = async (req, res) => {
  try {
    const { lat, lon, units } = req.body;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=${units}`,
    );
    const weatherData = response.data;
    res.status(200).json({
      status: true,
      message: "Current weather fetched successfully!",
      weatherData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to get the weather for given location!",
      error: error?.message || "Something went wrong!",
    });
  }
};

export const fiveDayForecastCityWeatherController = async (req, res) => {
  try {
    const { city, units } = req.body;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=${units}`,
    );
    const weatherData = response.data;
    res.status(200).json({
      status: true,
      message: "ForeCast fetched  successfully!",
      weatherData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to get the forecast for given location!",
      error: error?.message || "Something went wrong!",
    });
  }
};

export const fiveDayForecastLatLongWeatherController = async (req, res) => {
  try {
    const { lat, lon, units } = req.body;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=${units}`,
    );
    const weatherData = response.data;
    res.status(200).json({
      status: true,
      message: "ForeCast fetched  successfully!",
      weatherData,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Unable to get the forecast for given location!",
      error: error?.message || "Something went wrong!",
    });
  }
};
