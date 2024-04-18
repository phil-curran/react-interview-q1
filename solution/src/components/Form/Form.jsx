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
  const [validName, setValidName] = useState(false);

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
      setValidName(isValid);
    }
  };

  // submits form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validName) {
      setEntries([...entries, formData]);
      console.log(entries);
    }
    handleClearForm();
    setValidName(false);
  };

  // handler for clearing form date
  const handleClearForm = () => {
    setFormData({
      name: "",
      location: "",
    });
    setValidName(false);
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
    <>
      <form className="form">
        <div className="name field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
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
            required
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
          <button type="button" onClick={handleClearForm}>
            Clear
          </button>
          <button type="button" onClick={handleSubmit} disabled={!validName}>
            Add
          </button>
        </div>
      </form>

      {entries.length < 1 ? (
        <p className="no-entries">No entries!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="nameHeader">Name</th>
              <th className="locationHeader">Location</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr className={index % 2 === 0 ? "even" : null} key={index}>
                <td>{entry.name}</td>
                <td>{entry.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
