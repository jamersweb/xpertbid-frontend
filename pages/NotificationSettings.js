import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("most-recent");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "https://violet-meerkat-830212.hostingersite.com/public/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    if (session) {
      fetchNotifications();
    }
  }, [session]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const deleteNotification = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this notification?");
    
    if (isConfirmed) {
      try {
        await axios.delete(
          `https://violet-meerkat-830212.hostingersite.com/public/api/notifications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          }
        );
  
        // Remove deleted notification from state
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
  
        window.alert("Notification deleted successfully!");
      } catch (error) {
        console.error("Error deleting notification:", error);
        window.alert("Error! Failed to delete the notification.");
      }
    }
  };
  
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read_at;
    if (filter === "earlier") return notification.created_at < "2022-01-01"; // Example filter
    return true; // Default: "most-recent"
  });

  return (
    <>
      <Header />
      <section className="allNotifications">
        <div className="container-fluid">
          <div className="listing-main-heading">
            <h2>Notifications</h2>
            <select
              name="notificationFilter"
              id="notificationFilter"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="most-recent">Most Recent</option>
              <option value="earlier">Earlier</option>
              <option value="unread">Unread</option>
            </select>
          </div>

          {loading && <p>Loading notifications...</p>}

          {!loading &&
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`allNotificationPopup col-12 ${
                  notification.read_at ? "allNotificationPopupReaded" : ""
                }`}
              >
                <div className="allNotifyContent">
                  <div className="notifyContent">
                    <div className="notifyPopImage">
                      <img
                        src={
                          notification.image_url ||
                          "./assets/images/message-text.svg"
                        }
                        alt="Notification Icon"
                      />
                    </div>
                    <div className="notifyMsg">
                      <p className="notimsg">
                        {notification.title || "Notification Title"}
                      </p>
                      <p className="noti-time">
                        <span className="noti-date">
                          {new Date(notification.created_at).toLocaleDateString()}
                        </span>
                        ,{" "}
                        <span className="time">
                          {new Date(notification.created_at).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className="notify-remove"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Notifications;
