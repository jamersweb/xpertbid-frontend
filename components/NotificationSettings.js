import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const { data: session } = useSession();
  useEffect(() => {
    const fetchNotificationSettings = async () => {
      try {
        const response = await axios.get("https://violet-meerkat-830212.hostingersite.com/public/api/user/notifications", {
          headers: { Authorization: `Bearer ${session.user.token}` },
        });

        setPreferences({
          ...response.data,
          biddingConditions: response.data.biddingConditions || {
            outbid: false,
            republished: false,
            oneDayReminder: false,
            oneHourReminder: false,
            fifteenMinutesReminder: false,
          },
        });
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
      setLoading(true);
      const response = await axios.post(
        "https://violet-meerkat-830212.hostingersite.com/public/api/user/notifications",
        preferences,
        {
          headers: { Authorization: `Bearer ${session.user.token}` },
        }
      );
      setMessage("Notification settings saved successfully!");
    } catch (error) {
      console.error("Error saving notification settings:", error);
      setMessage("Failed to save notification settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile" id="notification-settings">
      <div className="profile-heading-and-button">
        <h3>Notification Settings</h3>
        <button
          className="button-style-2"
          onClick={saveNotificationSettings}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Notification Settings"}
        </button>
      </div>
      <p className="mb-5">
        Manage your notification preferences to stay updated on auction wins, bids, and important updates. Customize how
        and when you would like to receive alerts.
      </p>
      {message && <p className="alert-message alert text-success alert-success">{message}</p>}
      <div className="notify-setting-inner-box">
        <h4>Bidding</h4>
        <div className="nofify-form-1">
          {Object.entries(preferences.biddingConditions || {}).map(([key, value], index) => (
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
                  {key === "outbid" && "Let me know when I am outbid"}
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
