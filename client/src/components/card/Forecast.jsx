/* eslint-disable react/prop-types */
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";

const Forecast = (props) => {
  const [date, time] = props.dt_txt.split(" ");
  return (
    <div className="forecast pt-2">
      <p className="text-center fw-bold">{date}</p>
      <p>
        <FaTemperatureLow /> Temp: {props.main.temp}°
      </p>
      <p>
        <FaTemperatureHigh /> Feels Like: {props.main.feels_like}°
      </p>
      <p className="fw-bold">
        <IoTimerOutline /> {time}
      </p>
    </div>
  );
};

export default Forecast;
