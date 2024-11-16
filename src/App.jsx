import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortType, setSortType] = useState('');
  const [top10Filter, setTop10Filter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data.map(country => ({
          name: country.name.common,
          flag: country.flags.svg,
          capital: country.capital ? country.capital[0] : 'N/A',
          population: country.population,
          area: country.area,
          continent: country.continents ? country.continents[0] : 'N/A',
          subregion: country.subregion || 'N/A',
        }));
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFilter = () => {
    let filtered = [...countries];
    if (continentFilter) {
      filtered = filtered.filter(country => country.continent === continentFilter);
    }
    if (subregionFilter) {
      filtered = filtered.filter(country => country.subregion === subregionFilter);
    }
    if (top10Filter === 'population') {
      filtered = filtered.sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (top10Filter === 'area') {
      filtered = filtered.sort((a, b) => b.area - a.area).slice(0, 10);
    }
    if (sortType === 'alphabetical') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCountries(filtered);
  };

  useEffect(handleFilter, [continentFilter, subregionFilter, sortType, top10Filter]);

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        <select onChange={e => { setContinentFilter(e.target.value); setSubregionFilter(''); }}>
          <option value="">Filter by Continent</option>
        </select>
        <select onChange={e => { setSubregionFilter(e.target.value); setContinentFilter(''); }}>
          <option value="">Filter by Subregion</option>
        </select>
        <select onChange={e => setSortType(e.target.value)}>
          <option value="">Sort by</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
        <select onChange={e => setTop10Filter(e.target.value)}>
          <option value="">Top 10 by</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </div>
      <Countries data={filteredCountries} />
    </div>
  );
};

export default App;
