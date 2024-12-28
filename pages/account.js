//import React, { useState } from "react";
//import axios from "axios";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import AddressComponent from "../components/AddressComponent";
// import PasswordLoginSettings from "../components/PasswordLoginSettings";
// import NotificationSettings from "../components/NotificationSettings";
// import IdentityVerification from "../components/IdentityVerification";
// import { useSession } from "next-auth/react";

const AccountSettings = () => {
   //const [activeSection, setActiveSection] = useState("profile");
//   const [loading, setLoading] = useState(false);
// //  const [message, setMessage] = useState("");
//   const { data: session } = useSession();
//   const userToken = session?.user?.token; // Assumes token is part of session data

//   // Profile Data
//   const [profile, setProfile] = useState({
//     username: "",
//     phoneNumber: "",
//     fullName: "",
//     country: "",
//   });
//   // const [businessInfo, setBusinessInfo] = useState({
//   //   companyName: "",
//   //   vatNumber: "",
//   // });
//   const [profilePicture, setProfilePicture] = useState(null);

//   // Address Data
//   // const [address, setAddress] = useState({
//   //   street1: "",
//   //   street2: "",
//   //   city: "",
//   //   state: "",
//   //   postalCode: "",
//   //   contactNumber: "",
//   //   otherNumber: "",
//   // });

//   // Notification Settings
//   // const [notifications, setNotifications] = useState({
//   //   newsletters: true,
//   //   outbidAlerts: true,
//   //   republishedAlerts: false,
//   //   reminders: {
//   //     oneDay: true,
//   //     oneHour: true,
//   //     fifteenMinutes: false,
//   //   },
//   // });

//   // Password & Login Data
//   // const [passwordData, setPasswordData] = useState({
//   //   currentPassword: "",
//   //   newPassword: "",
//   //   confirmPassword: "",
//   // });

//   // Fetch data on load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/account-settings", {
//           headers: { Authorization: `Bearer ${userToken}` },
//         });
//         setProfile(response.data.profile);
//         setAddress(response.data.address);
//         setNotifications(response.data.notifications);
//       } catch (error) {
//         console.error("Error fetching account settings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleInputChange = (e, setState) => {
//     const { name, value, type, checked } = e.target;
//     setState((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleProfilePictureUpload = (e) => {
//     const file = e.target.files[0];
//     setProfilePicture(file);
//   };

//   const saveProfile = async () => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("username", profile.username);
//       formData.append("phoneNumber", profile.phoneNumber);
//       formData.append("fullName", profile.fullName);
//       formData.append("country", profile.country);
//       if (profilePicture) {
//         formData.append("profilePicture", profilePicture);
//       }

//       const response = await axios.post(
//         "https://violet-meerkat-830212.hostingersite.com/public/api/user/update",
//         formData,
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );

//       setMessage(response.data.message || "Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setMessage("An error occurred while updating your profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

  // const saveAddress = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://violet-meerkat-830212.hostingersite.com/public/api/address/update",
  //       address,
  //       {
  //         headers: { Authorization: `Bearer ${userToken}` },
  //       }
  //     );
  //     setMessage(response.data.message || "Address updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating address:", error);
  //     setMessage("An error occurred while updating your address.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const saveNotifications = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://violet-meerkat-830212.hostingersite.com/public/api/notifications/update",
  //       notifications,
  //       {
  //         headers: { Authorization: `Bearer ${userToken}` },
  //       }
  //     );
  //     setMessage(response.data.message || "Notification settings updated!");
  //   } catch (error) {
  //     console.error("Error updating notifications:", error);
  //     setMessage("An error occurred while updating notifications.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const savePassword = async () => {
  //   if (passwordData.newPassword !== passwordData.confirmPassword) {
  //     setMessage("New password and confirm password do not match.");
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "https://violet-meerkat-830212.hostingersite.com/public/api/password/update",
  //       passwordData,
  //       {
  //         headers: { Authorization: `Bearer ${userToken}` },
  //       }
  //     );
  //     setMessage(response.data.message || "Password updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating password:", error);
  //     setMessage("An error occurred while updating your password.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  return (
    <>
    <Header />
    <section className="account-setting">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 user-setting">
            <div className="setting">
              <h3>User Settings</h3>
              <ul className="userSettingsMenu">
                <li>
                  <button className="myProfile profile-item active">
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="address profile-item">Address</button>
                </li>
                <li>
                  <button className="notificationSetting profile-item">
                    Notification Settings
                  </button>
                </li>
                <li>
                  <button className="passAndLogin profile-item">
                    Password &amp; Loign
                  </button>
                </li>
                <li>
                  <button className="identityVerification profile-item">
                    Identity Verification
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8 user-profile">
            {/* My Profile */}
            <div className="profile show" id="my-profile">
              <div className="profile-heading-and-button">
                <h3>My Profile</h3>
                <button className="button-style-2">Save Changes</button>
              </div>
              <div className="profile-piture-and-upldRmov">
                <div className="row">
                  <div className="col-md-6">
                    <div className="profile-photo-format">
                      <div className="profile-photo-name">
                        <img
                          id="profileImage"
                          src="./assets/images/profile-circle.svg"
                          alt="Profile Picture"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="profile-title-img-format">
                        <h4 className="profile-title">Profile Picture</h4>
                        <div className="profile-format">
                          Upload any PNG, JPG file under 2MB.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="profile-upload-btn">
                      <input
                        type="file"
                        id="profileInput"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                      />
                      <button
                        className="upload upload-btn button-style-3"
                        id="uploadButton"
                      >
                        <img
                          src="./assets/images/document-upload-dark.svg"
                          alt="Upload"
                        />{" "}
                        upload
                      </button>
                      <button
                        className="remove-profile upload-btn button-style-4"
                        id="removeButton"
                      >
                        <img
                          src="./assets/images/trash-dark.svg"
                          alt="Remove"
                        />{" "}
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="personal-information">
                <div className="heading-personal-info">
                  <h3>Personal Information</h3>
                </div>
                <div className="profile-form">
                  <form>
                    <div className="row">
                      <div className="col-md-6 form-child">
                        <label htmlFor="username">Username*</label>
                        <input type="text" id="username" placeholder="Username*" />
                      </div>
                      <div className="col-md-6 form-child">
                        <label htmlFor="phoneNumber">Phone Number*</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="+3939204921*"
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label htmlFor="fullName">Your Full Name*</label>
                        <input
                          type="text"
                          id="fullName"
                          placeholder="Full Name*"
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label htmlFor="country">Country*</label>
                        <select id="country">
                          <option value="">United States</option>
                          <option value="">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
                <button className="busniess-info" id="toggle-business-info">
                  <img src="./assets/images/addition-svg.svg" alt="" />
                  Add Business Info
                </button>
                <div className="busniess-form" id="business-info">
                  <div className="heading-personal-info">
                    <h3>Busniess Information</h3>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-md-6 form-child">
                        <label htmlFor="companyName">Company Name*</label>
                        <input
                          type="text"
                          id="companyName"
                          placeholder="Company Name*"
                        />
                      </div>
                      <div className="col-md-6 form-child">
                        <label htmlFor="vatNumber">VAT Number</label>
                        <input
                          type="tel"
                          id="vatNumber"
                          placeholder="Please Enter Your VAT Number"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <button className="close-account">Close my account</button>
              </div>
            </div>

            {/* Address */}
            <div className="profile" id="address" style={{ display: "none" }}>
              <div className="profile-heading-and-button">
                <h3>Address Information</h3>
                <button className="button-style-2">Save Address</button>
              </div>
              <p className="mb-5">
                Add your shipping address to ensure smooth deliveries for your
                auction wins. You can update or edit this address anytime for
                future purchases.
              </p>
              <div className="profile-form">
                <form>
                  <div className="row">
                    <div className="col-12 form-child">
                      <label htmlFor="address-line1">Street Address 1</label>
                      <input
                        type="text"
                        id="address-line1"
                        placeholder="Address Line 1*"
                      />
                    </div>
                    <div className="col-12 form-child">
                      <label htmlFor="address-line2">Street Address 2</label>
                      <input
                        type="text"
                        id="address-line2"
                        placeholder="Address Line 2"
                      />
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="countrySelect">Country</label>
                      <select id="countrySelect">
                        <option value="">United States</option>
                        <option value="">United Kingdom</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="city1">City</label>
                      <input
                        type="text"
                        id="city1"
                        placeholder="State*"
                      />
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="state1">State</label>
                      <input
                        type="text"
                        id="state1"
                        placeholder="Enter your state here"
                      />
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="postalCode">Postal Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        placeholder="Enter your postal code here"
                      />
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="contactNumber">Contact Number</label>
                      <input
                        type="text"
                        id="contactNumber"
                        placeholder="Enter phone number "
                      />
                    </div>
                    <div className="col-md-6 form-child">
                      <label htmlFor="otherNumber">Other Number</label>
                      <input
                        type="text"
                        id="otherNumber"
                        placeholder="Enter any other number"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Notification Settings */}
            <div
              className="profile"
              id="notification-settings"
              style={{ display: "none" }}
            >
              <div className="profile-heading-and-button">
                <h3>Notification Settings</h3>
                <button className="button-style-2">Save Notification Settings</button>
              </div>
              <p className="mb-5">
                Manage your notification preferences to stay updated on auction wins,
                bids, and important updates. Customize how and when you would like to
                receive alerts.
              </p>

              <div className="notify-setting-inner-box">
                <h4>Newsletters</h4>
                <p>
                  Inspiration in your inbox! You can always unsubscribe later if
                  you change your mind.
                </p>
                <div className="nofify-form-1">
                  <form>
                    <div className="col-12 notify-child">
                      <input type="checkbox" name="inspiration" id="inspiration" />
                      <div className="label-and-info">
                        <label htmlFor="inspiration">Inspiration</label>
                        <p>
                          Inspiration in your inbox! You can always unsubscribe
                          later if you change your mind.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 notify-child">
                      <input type="checkbox" name="newsletter" id="newsletter" />
                      <div className="label-and-info">
                        <label htmlFor="newsletter">Other newsletters</label>
                        <p>
                          Inspiration in your inbox! You can always unsubscribe
                          later if you change your mind.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="notify-setting-inner-box">
                <h4>Bidding</h4>
                <p>
                  We will remind you about items you have bid on or that you are
                  following, by email and push notifications in our app.
                </p>
                <div className="nofify-form-1">
                  <form>
                    <div className="col-12 notify-child">
                      <input
                        type="checkbox"
                        name="bidingCondition1"
                        id="biding-condition-1"
                      />
                      <div className="label-and-info">
                        <label htmlFor="biding-condition-1">
                          Let me know when Im outbid
                        </label>
                      </div>
                    </div>
                    <div className="col-12 notify-child">
                      <input
                        type="checkbox"
                        name="bidingCondition2"
                        id="biding-condition-2"
                      />
                      <div className="label-and-info">
                        <label htmlFor="biding-condition-2">
                          Let me know when items are republished
                        </label>
                      </div>
                    </div>
                    <div className="col-12 notify-child">
                      <input
                        type="checkbox"
                        name="bidingCondition3"
                        id="biding-condition-3"
                      />
                      <div className="label-and-info">
                        <label htmlFor="biding-condition-3">
                          Remind me 1 day before bidding closes
                        </label>
                      </div>
                    </div>
                    <div className="col-12 notify-child">
                      <input
                        type="checkbox"
                        name="bidingCondition4"
                        id="biding-condition-4"
                      />
                      <div className="label-and-info">
                        <label htmlFor="biding-condition-4">
                          Remind me 1 hour before bidding closes
                        </label>
                      </div>
                    </div>
                    <div className="col-12 notify-child">
                      <input
                        type="checkbox"
                        name="bidingCondition5"
                        id="biding-condition-5"
                      />
                      <div className="label-and-info">
                        <label htmlFor="biding-condition-5">
                          Remind me 15 minutes before bidding closes
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Password & Login */}
            <div className="profile" id="password-login" style={{ display: "none" }}>
              <div className="profile-heading-and-button">
                <h3>Password &amp; Login</h3>
                <button className="button-style-2">Save Changes</button>
              </div>
              <div className="profile-form">
                <form>
                  <div className="row">
                    <div className="col-12 form-child">
                      <label htmlFor="phoneNumberPw">Phone Number*</label>
                      <input type="text" id="phoneNumberPw" placeholder="Phone Number" />
                    </div>
                    <div className="col-12 form-child">
                      <label htmlFor="contactEmail">Contact Email</label>
                      <input
                        type="email"
                        id="contactEmail"
                        placeholder="Contact Email"
                      />
                    </div>
                  </div>
                </form>
                <p className="mb-4">
                  We will send you a verification code on your given email to
                  confirm it’s you. After that you can setup a password for your
                  account.
                </p>

                <div className="account-connected-password" style={{ display: "none" }}>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="password-msg-parent">
                        <img src="./assets/images/check-svg.svg" alt="" />
                        <div className="connected-account-password-msg">
                          <p className="password-sent">Password has been set</p>
                          <p className="pswd-msg">
                            Choose a strong, unique password that’s at least 8 characters
                            long.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="chang-pas-btn">
                        <button className="button-style-3" id="changeAccountPassword">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="connected-accounts">
                  <h3>Connected Accounts</h3>
                  <p>Connect your Google or Apple account for instant login.</p>

                  <div className="connected-buttons">
                    <div className="row">
                      <div className="col-md-6">
                        <button className="connect-with-google" id="connect-google">
                          <img src="./assets/images/googleLogo.svg" alt="" />
                          Connect with Google
                        </button>
                        <button
                          className="connected-with-google"
                          id="connected-google"
                          style={{ display: "none" }}
                        >
                          <span>
                            <img src="./assets/images/googleLogo.svg" alt="" />
                            Connected
                          </span>
                          <span className="remove-account">Remove</span>
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button className="connect-with-apple">
                          <img src="./assets/images/appleLogo.svg" alt="" />
                          Connect with Apple
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Popup */}
              <div id="confirmation-popup" style={{ display: "none" }}>
                <div className="confirmation-popup">
                  <div className="popup-content">
                    <div className="content">
                      <p className="text-center">
                        Are you sure you want to remove your Google account?
                      </p>
                      <div className="row">
                        <div className="col-6">
                          <button id="confirm-remove" className="button-style-5 w-100">
                            Yes
                          </button>
                        </div>
                        <div className="col-6">
                          <button id="cancel-remove" className="button-style-6 w-100">
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Identity Verification */}
                <div
                  className="profile"
                  id="identity-verification"
                  style={{ display: "none" }}
                >
                  <div className="profile-heading-and-button">
                    <h3>Identity Verification</h3>
                    <button className="button-style-2">Save Verification Details</button>
                  </div>
                  <div className="profile-form">
                    <form>
                      <div className="row">
                        <div className="col-md-6 form-child">
                          <label htmlFor="identity-document">Upload Identity Document*</label>
                          <input type="file" id="identity-document" />
                        </div>
                        <div className="col-md-6 form-child">
                          <label htmlFor="document-type">Document Type*</label>
                          <select id="document-type">
                            <option value="passport">Passport</option>
                            <option value="driver-license">Drivers License</option>
                            <option value="id-card">ID Card</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div id="createPasswordPopUpAccount" style={{ display: "none" }}>
                <div className="createPasswordPopUp">
                  <div className="password-content">
                    <button className="close" id="closeCreatePasswordPopup">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="password">
                      <h3>Create New Password</h3>
                      <div className="create-password-form">
                        <form id="passwordForm">
                          <div className="col-12 create-password-child">
                            <label htmlFor="oldPassword">Old Password</label>
                            <input
                              type="password"
                              id="oldPassword"
                              placeholder="Enter your old password"
                            />
                          </div>
                          <div className="col-12 create-password-child">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                              type="password"
                              id="newPassword"
                              placeholder="Enter your new password"
                            />
                          </div>
                          <div className="col-12 create-password-child">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                              type="password"
                              id="confirmPassword"
                              placeholder="Confirm your new password"
                            />
                          </div>
                          <ul className="password-requirements">
                            <li id="lowercaseReq">
                              <i className="fa-solid fa-circle-check"></i> At least one
                              lowercase letter
                            </li>
                            <li id="uppercaseReq">
                              <i className="fa-solid fa-circle-check"></i> At least one
                              uppercase letter
                            </li>
                            <li id="numberReq">
                              <i className="fa-solid fa-circle-check"></i> At least one
                              number
                            </li>
                            <li id="lengthReq">
                              <i className="fa-solid fa-circle-check"></i> Minimum 8
                              characters
                            </li>
                            <li id="matchReq">
                              <i className="fa-solid fa-circle-check"></i> Passwords must
                              match
                            </li>
                            <li id="notSameReq">
                              <i className="fa-solid fa-circle-check"></i> New password must
                              not be the same as the old one
                            </li>
                          </ul>
                          <button
                            type="submit"
                            className="button-style-2 change-password w-100"
                            id="changePasswordBtn"
                          >
                            Change Password
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Identity Verification (second block, possibly a duplicate?) */}
            <div className="profile" id="identyVerify" style={{ display: "none" }}>
              <div className="identity-heading-and-button">
                <h3>Identity Verifications</h3>
                <button className="button-style-2">Save Settings</button>
              </div>
              <p className="mb-5 identity-note">
                Add your shipping address to ensure smooth deliveries for your auction
                wins. You can update or edit this address anytime for future
                purchases.
              </p>
              <div className="notify-setting-inner-box">
                <h3>Verify your identity with an ID document</h3>
                <ul className="identity-requirements">
                  <li>A valid ID document in the issuing country.</li>
                  <li>A clear picture where all four corners are visible.</li>
                  <li>Include the back if it has identifying information.</li>
                  <li>
                    Certified, meaning another person confirms that the copy corresponds
                    to the original by providing their signature, name clarification, and
                    telephone number.
                  </li>
                </ul>
                <div className="front-and-back">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="front">
                        <div className="btn-and-name text-center">
                          <input
                            type="file"
                            id="frontUpload"
                            accept="image/png, image/jpeg"
                            style={{ display: "none" }}
                          />
                          <button className="button-style-3" id="uploadFrontButton">
                            <img
                              src="./assets/images/document-upload-dark.svg"
                              alt="upload front"
                            />{" "}
                            Upload Front
                          </button>
                          <p
                            className="show-document-name my-3"
                            id="frontDocumentName"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="back">
                        <div className="btn-and-name text-center">
                          <input
                            type="file"
                            id="backUpload"
                            accept="image/png, image/jpeg"
                            style={{ display: "none" }}
                          />
                          <button className="button-style-3" id="uploadBackButton">
                            <img
                              src="./assets/images/document-upload-dark.svg"
                              alt="upload back"
                            />{" "}
                            Upload Back
                          </button>
                          <p
                            className="show-document-name my-3"
                            id="backDocumentName"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="identity-note">JPG or PNG. Max 2 images.</p>
                </div>
              </div>
              <div className="document-types-and-format">
                <div className="row">
                  <div className="col-md-6 form-child">
                    <label htmlFor="documentType">Document Type</label>
                    <select id="documentType">
                      <option value="idCard">Identity Card</option>
                    </select>
                  </div>
                  <div className="col-md-6 form-child">
                    <label htmlFor="issueCountry">Issue Country</label>
                    <select id="issueCountry">
                      <option value="pakistan">Pakistan</option>
                    </select>
                  </div>
                  <div className="col-md-6 form-child">
                    <label htmlFor="fullNameDoc">Full Name</label>
                    <input type="text" id="fullNameDoc" placeholder="Full Name" />
                  </div>
                  <div className="col-md-6 form-child">
                    <label htmlFor="birthDate">Birth Date</label>
                    <input type="date" id="birthDate" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <Footer />
    </>
  );
};

export default AccountSettings;
