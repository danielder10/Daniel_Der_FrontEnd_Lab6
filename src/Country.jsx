import React from "react";
import "./Country.css";

const Country = ({ country }) => {
  return (
    <div className="country-card">
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className="country-flag"
      />
      <h3>{country.name}</h3>
      <p>
        <strong>Official name:</strong> {country.name}
      </p>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>
      <p>
        <strong>Area (mi²):</strong> {country.area.toLocaleString()}
      </p>
      <p>
        <strong>Subregion:</strong> {country.subregion}
      </p>
      <p>
        <strong>Continents:</strong> {country.continent}
      </p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${country.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="country-link"
      >
        Show on Google Maps
      </a>
    </div>
  );
};

export default Country;
