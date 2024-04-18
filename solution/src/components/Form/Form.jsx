/* eslint-disable no-unused-vars */

// import react hooks
import { useState, useEffect } from "react";

// import mock api functions
import { isNameValid, getLocations } from "../../mock-api/apis";

// import debounce utility
import { debounce } from "lodash"; // Import debounce from lodash

// styling for this component
import "./form.css";

export default function Form() {
  // LOCAL STATES
  // placeholder for form inputs
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  // placeholder for name validation status
  const [validName, setValidName] = useState(null);

  // placeholder for name data validation errors
  const [nameValidationError, setNameValidationError] = useState(false);

  //placeholder for locations list & api call
  const [locations, setLocations] = useState([]);

  // placeholder for local list of entries from api call
  const [entries, setEntries] = useState([]);

  // EVENT HANDLERS
  // handles and updates input field change to formData state
  const handleFormChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") {
      const isValid = await isNameValid(value);
      console.log(isValid);
      setValidName(isValid);
      setNameValidationError(isValid);
    }
  };

  // submits form data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (validName) {
      setEntries([...entries, formData]);
      console.log(entries);
    }
  };

  // handler for clearing form date
  const handleClearForm = () => {
    setFormData({
      name: "",
      location: "",
    });
    console.log("form cleared");
  };

  // fetch data post page load
  useEffect(() => {
    const fetchLocations = async () => {
      const locationsData = await getLocations();
      setLocations(locationsData);
    };

    fetchLocations();
  }, []);

  return (
    <form className="form">
      <div className="name field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
        {formData.name ? (
          validName ? (
            <span className="error-message valid">Name is valid</span>
          ) : (
            <span className="error-message invalid">Name is invalid</span>
          )
        ) : null}
      </div>
      <div className="location field">
        <label htmlFor="location">Location</label>
        <select
          name="location"
          id="location"
          value={formData.location}
          onChange={handleFormChange}
        >
          <option value="" disabled></option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="actions">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={handleClearForm}>
          Clear
        </button>
      </div>
    </form>
  );
}
