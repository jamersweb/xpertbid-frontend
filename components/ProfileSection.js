   import React, { useState, useEffect } from "react";
   import axios from "axios";

  const isFullPath = (url) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const ProfileSection = ({ profile, setProfile, saveProfile, loading }) => {
      const [countries, setCountries] = useState([]);
      const [message, setMessage] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          const countriesRes = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/get-countries");
            
          
          setCountries(countriesRes.data.country);

        } catch (error) {
          console.error("Error fetching identity data:", error);
        }
      };

      fetchData();
    }, []);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      
      return (
        <div className="profile">
          <div className="profile-heading-and-button">
            <h3>My Profile</h3>
            <button
              className="button-style-2"
              onClick={saveProfile}
              disabled={loading}
            >

              {loading ? "Saving..." : "Save Changes"}                            
            </button>
          </div>
          <div className="profile-piture-and-upldRmov">
            <div className="row">
              <div className="col-md-6">
                <div className="profile-photo-format">
                <img
                  id="profileImage"
                  src={
                    profile.profile_pic && isFullPath(profile.profile_pic)
                      ? profile.profile_pic
                      : `https://violet-meerkat-830212.hostingersite.com/storage/app/public/${profile.profile_pic}`
                  }
                  style={{width:"150px",
                    objectFit:"contain"
                  }}
                  alt="Profile"
                />




  <div className="profile-upload-btn">
    <input
      type="file"
      name="image"  // Backend ke liye 'image' naam ka field
      id="profileInput"
      accept="image/png, image/jpeg"
      style={{ display: "none" }}
      onChange={(e) =>
        setProfile((prev) => ({
          ...prev,
          profilePicture: e.target.files[0],
        }))
      }
    />
    <button
      className="upload upload-btn button-style-3"
      onClick={() =>
        document.getElementById("profileInput").click()
      }
    >
      Upload
    </button>
  </div>

                </div>
              </div>
            </div>
          </div>
    
          <div className="personal-information">
            <h3>Personal Information</h3>
            <form>
              <div className="row">
                <div className="col-md-6 form-child">
                  <label>Username*</label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    placeholder="Enter Username"
                  />
                </div>
                <div className="col-md-6 form-child">
                  <label>Phone Number*</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="col-md-6 form-child">
                  <label>Your Full Name*</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                  />
                </div>
                <div className="col-md-6 form-child">
                  <label>Country*</label>
                  <select
                    name="country"
                    value={profile.country}
                    onChange={handleInputChange}
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
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default ProfileSection;  









  