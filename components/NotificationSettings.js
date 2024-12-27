import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    inspiration: false,
    newsletter: false,
    biddingConditions: {
      outbid: false,
      republished: false,
      oneDayReminder: false,
      oneHourReminder: false,
      fifteenMinutesReminder: false,
    },
  });

  // Fetch existing notification settings when the component mounts
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/user/notifications");
        setPreferences(response.data);
      } catch (error) {
        console.error("Error fetching notification settings:", error);
      }
    };

    fetchNotificationSettings();
  }, []);

  const handleCheckboxChange = (e, key, parentKey = null) => {
    const { checked } = e.target;
    setPreferences((prev) => {
      if (parentKey) {
        return {
          ...prev,
          [parentKey]: {
            ...prev[parentKey],
            [key]: checked,
          },
        };
      }
      return {
        ...prev,
        [key]: checked,
      };
    });
  };

  const saveNotificationSettings = async () => {
    try {
      const response = await axios.post("https://violet-meerkat-830212.hostingersite.com/public/api/user/notifications", preferences);
      alert("Notification settings saved successfully!");
    } catch (error) {
      console.error("Error saving notification settings:", error);
      alert("Failed to save notification settings.");
    }
  };

  return (
    <div className="profile" id="notification-settings">
      <div className="profile-heading-and-button">
        <h3>Notification Settings</h3>
        <button className="button-style-2" onClick={saveNotificationSettings}>
          Save Notification Settings
        </button>
      </div>
      <p className="mb-5">
        Manage your notification preferences to stay updated on auction wins, bids, and important updates. Customize how
        and when you'd like to receive alerts.
      </p>

      <div className="notify-setting-inner-box">
        <h4>Newsletters</h4>
        <p>Inspiration in your inbox! You can always unsubscribe later if you change your mind.</p>
        <div className="nofify-form-1">
          <div className="col-12 notify-child">
            <input
              type="checkbox"
              name="inspiration"
              id="inspiration"
              checked={preferences.inspiration}
              onChange={(e) => handleCheckboxChange(e, "inspiration")}
            />
            <div className="label-and-info">
              <label htmlFor="inspiration">Inspiration</label>
              <p>Inspiration in your inbox! You can always unsubscribe later if you change your mind.</p>
            </div>
          </div>
          <div className="col-12 notify-child">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={preferences.newsletter}
              onChange={(e) => handleCheckboxChange(e, "newsletter")}
            />
            <div className="label-and-info">
              <label htmlFor="newsletter">Other newsletters</label>
              <p>Inspiration in your inbox! You can always unsubscribe later if you change your mind.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="notify-setting-inner-box">
        <h4>Bidding</h4>
        <p>We'll remind you about items you've bid on or that you are following, by email and push notifications in our app.</p>
        <div className="nofify-form-1">
          {Object.entries(preferences.biddingConditions).map(([key, value], index) => (
            <div className="col-12 notify-child" key={index}>
              <input
                type="checkbox"
                name={key}
                id={key}
                checked={value}
                onChange={(e) => handleCheckboxChange(e, key, "biddingConditions")}
              />
              <div className="label-and-info">
                <label htmlFor={key}>
                  {key === "outbid" && "Let me know when I'm outbid"}
                  {key === "republished" && "Let me know when items are republished"}
                  {key === "oneDayReminder" && "Remind me 1 day before bidding closes"}
                  {key === "oneHourReminder" && "Remind me 1 hour before bidding closes"}
                  {key === "fifteenMinutesReminder" && "Remind me 15 minutes before bidding closes"}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
