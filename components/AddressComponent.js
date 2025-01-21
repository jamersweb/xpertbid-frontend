import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
const AddressComponent = () => {
  const [formData, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    contactNumber: "",
    otherNumber: "",
  });
  const { data: session } = useSession();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch countries and saved address when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [countriesRes, addressRes] = await Promise.all([
          axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-countries"),
          axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/user/address", {
            headers: { Authorization: `Bearer ${session.user.token}` },
          }),
        ]);
        
        setCountries(countriesRes.data.country);
        setFormData(addressRes.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: countryId,
      state: "", // Reset state and city when country changes
      city: "",
    }));

    try {
      const response = await axios.get(
        `https://violet-meerkat-830212.hostingersite.com/public/api/get-states/${countryId}`
      );
      setStates(response.data.state);
      setCities([]); // Reset cities
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: stateId,
      city: "", // Reset city when state changes
    }));

    try {
      const response = await axios.get(
        `https://violet-meerkat-830212.hostingersite.com/public/api/get-cities/${stateId}`
      );
      setCities(response.data.city);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    const requiredFields = ["addressLine1", "city", "state", "postalCode"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/address",
        formData,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setMessage(response.data.message || "Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      setMessage("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile" id="address">
      <div className="profile-heading-and-button">
        <h3>Address Information</h3>
        <button
          className="button-style-2"
          onClick={handleSaveAddress}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Address"}
        </button>
      </div>
      <p className="mb-5">
        Add your shipping address to ensure smooth deliveries for your auction
        wins. You can update or edit this address anytime for future purchases.
      </p>
      {message && <p className="alert-message text-success alert alert-success">{message}</p>}
      <div className="profile-form">
        <div className="row">
          <div className="col-12 form-child">
            <label htmlFor="addressLine1">Street Address 1*</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1*"
            />
          </div>
          <div className="col-12 form-child">
            <label htmlFor="addressLine2">Street Address 2</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="country">Country*</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {Array.isArray(countries) &&
                countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="state">State*</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              disabled={!states.length}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="city">City*</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!cities.length}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6 form-child">
            <label htmlFor="postalCode">Postal Code*</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code*"
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="Contact Number"
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="otherNumber">Other Number</label>
            <input
              type="text"
              id="otherNumber"
              name="otherNumber"
              value={formData.otherNumber}
              onChange={handleInputChange}
              placeholder="Other Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
