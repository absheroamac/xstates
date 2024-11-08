import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error(err);
        setCountries([]);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const getStates = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        );
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error(err);
        setStates([]);
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;
    const getCities = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        );
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  return (
    <div className="App" style={{ fontFamily: "sans-serif" }}>
      <h1>Select Location</h1>
      <select
        value={selectedCountry}
        disabled={countries.length === 0}
        onChange={(event) => setSelectedCountry(event.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        disabled={states.length === 0}
        onChange={(event) => setSelectedState(event.target.value)}
      >
        <option value="" disabled>
          Select State
        </option>
        {states.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        disabled={cities.length === 0}
        onChange={(event) => setSelectedCity(event.target.value)}
      >
        <option value="" disabled>
          Select City
        </option>
        {cities.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (
        <p>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default App;
