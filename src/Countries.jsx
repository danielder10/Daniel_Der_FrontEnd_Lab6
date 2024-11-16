import React from "react";
import Country from "./Country";
import "./Countries.css";

const Countries = ({ data }) => {
  return (
    <div className="countries-grid">
      {data.length > 0 ? (
        data.map((country, index) => (
          <Country key={index} country={country} />
        ))
      ) : (
        <p>No countries to display.</p>
      )}
    </div>
  );
};

export default Countries;
