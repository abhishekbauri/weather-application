import express from "express";
import {
  currentCityWeatherController,
  currentLatLongWeatherController,
  fiveDayForecastCityWeatherController,
  fiveDayForecastLatLongWeatherController,
} from "../controllers/weatherController.js";

const router = express.Router();

router.post("/current-weather-city", currentCityWeatherController);
router.post("/current-weather-lat-lon", currentLatLongWeatherController);
router.post("/five-day-forecast-city", fiveDayForecastCityWeatherController);
router.post(
  "/five-day-forecast-lat-lon",
  fiveDayForecastLatLongWeatherController,
);

export default router;
