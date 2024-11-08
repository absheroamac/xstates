import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCoutry, setSelectedCountry] = useState("");
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
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCoutry}/states`
        );
        const data = await res.json();
        setStates(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCountries();
  }, [selectedCoutry]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${selectedCoutry}/state=${selectedState}/cities`
        );
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCountries();
  }, [selectedState]);

  return (
    <div className="App" style={{ fontFamily: "sans-serif" }}>
      <h1>Select Location</h1>
      <div>
        <select
          disabled={countries.length === 0}
          onChange={(event) => setSelectedCountry(event.target.value)}
        >
          <option value="" disabled selected>
            Select Country
          </option>
          {countries.length > 0 &&
            countries.map((item) => <option value={item}>{item}</option>)}
        </select>

        <select
          disabled={states.length === 0}
          onChange={(event) => setSelectedState(event.target.value)}
        >
          <option value="" disabled selected>
            Select State
          </option>
          {states.length > 0 &&
            states.map((item) => <option value={item}>{item}</option>)}
        </select>

        <select
          disabled={cities.length === 0}
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          <option value="" disabled selected>
            Select City
          </option>
          {cities.length > 0 &&
            cities.map((item) => <option value={item}>{item}</option>)}
        </select>
      </div>
      {selectedCity !== "" && (
        <h2>
          You Selected {selectedCity}, {selectedState}, {selectedCoutry}
        </h2>
      )}
    </div>
  );
}

export default App;
