import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddressComponent from "../components/AddressComponent";
import PasswordLoginSettings from "../components/PasswordLoginSettings";
import NotificationSettings from "../components/NotificationSettings";
import IdentityVerification from "../components/IdentityVerification";
import ProfileSection from "@/components/ProfileSection"; // Adjust the path as needed

const AccountSettings = () => {
  const { data: session } = useSession();

  const [activeSection, setActiveSection] = useState(""); // Initialize activeSection state
  //const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    phoneNumber: "",
    fullName: "",
    country: "",
    profilePic: null,
  });
 
  const [loading, setLoading] = useState(false);
  //const [message, setMessage] = useState("");
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!session || !session.user) {
          console.error("Session or session.user is undefined");
          return;
        }
        setLoading(true);
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/account-settings",
          {
            headers: { Authorization: `Bearer ${session.user.token}` },
          }
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [session]); // Add session as a dependency
  

  const saveProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        formData.append(key, profile[key]);
      });

      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/update",
        formData,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
 

      setMessage(response.data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };
//ab
// const imageUrl = "`https://violet-meerkat-830212.hostingersite.com/storage/${fetchedProfile.profilePic}`;";

// if (isFullPath(imageUrl)) {
//   console.log("Full path detected:", imageUrl);
// } else {
//   console.log("Relative path detected:", imageUrl);
// }
//ab
  return (
    <>
      <Header />
      <section className="account-setting">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-4 user-setting">
              <div className="setting">
                <h3>User Settings</h3>
                <ul className="userSettingsMenu">
                  <li>
                    <button
                      className={`profile-item ${
                        activeSection === "profile" ? "active" : ""
                      }`}
                      onClick={() => setActiveSection("profile")}
                    >
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className={`profile-item ${
                        activeSection === "address" ? "active" : ""
                      }`}
                      onClick={() => setActiveSection("address")}
                    >
                      Address
                    </button>
                  </li>
                  <li>
                    <button
                      className={`profile-item ${
                        activeSection === "notifications" ? "active" : ""
                      }`}
                      onClick={() => setActiveSection("notifications")}
                    >
                      Notification Settings
                    </button>
                  </li>
                  <li>
                    <button
                      className={`profile-item ${
                        activeSection === "password" ? "active" : ""
                      }`}
                      onClick={() => setActiveSection("password")}
                    >
                      Password & Login
                    </button>
                  </li>
                  <li>
                    <button
                      className={`profile-item ${
                        activeSection === "identity" ? "active" : ""
                      }`}
                      onClick={() => setActiveSection("identity")}
                    >
                      Identity Verification
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Content Section */}
            <div className="col-lg-8 user-profile">
              {activeSection === "profile" && (
                <ProfileSection
                  profile={profile}
                  setProfile={setProfile}
                  saveProfile={saveProfile}
                  loading={loading}
                />
              )}
              {activeSection === "address" && <AddressComponent />}
              {activeSection === "notifications" && <NotificationSettings />}
              {activeSection === "password" && <PasswordLoginSettings />}
              {activeSection === "identity" && <IdentityVerification />}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AccountSettings;