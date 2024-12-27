import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [countries, setCountries] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchAddress = async () => {
      try {
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/user/address");
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchCountries();
    fetchAddress();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/user/address", formData);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
    }
  };

  return (
    <div className="profile" id="address">
      <div className="profile-heading-and-button">
        <h3>Address Information</h3>
        <button className="button-style-2" onClick={handleSaveAddress}>
          Save Address
        </button>
      </div>
      <p className="mb-5">
        Add your shipping address to ensure smooth deliveries for your auction wins. You can update or edit this
        address anytime for future purchases.
      </p>
      <div className="profile-form">
        <div className="row">
          <div className="col-12 form-child">
            <label htmlFor="addressLine1">Street Address 1</label>
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
            <label htmlFor="country">Country</label>
            <select name="country" value={formData.country} onChange={handleInputChange}>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City*"
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State*"
            />
          </div>
          <div className="col-md-6 form-child">
            <label htmlFor="postalCode">Postal Code</label>
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
              placeholder="Contact Number*"
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
