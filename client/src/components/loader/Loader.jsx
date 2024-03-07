/* eslint-disable react/prop-types */
import "./Loader.css";

const Loader = ({ title = "Loading..." }) => {
  return (
    <div className="loading-spinner">
      <div className="loader"></div>
      <h3 className="text-light">{title}</h3>
    </div>
  );
};

export default Loader;
