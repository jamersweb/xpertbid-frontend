import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      // If the current time is before the start date or after the end date
      if (now < start) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        setIsActive(false);
        return;
      } else if (now >= end) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        setIsActive(false);
        return;
      }

      setIsActive(true);
      const timeDiff = end - now; // in milliseconds

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

      setTimeLeft({ days, hours, minutes });
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every minute
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute to save resources

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="counter">
      {isActive ? (
        <>
          <span className="days">{timeLeft.days}d </span>
          <span className="hours">{timeLeft.hours}h </span>
          <span className="minutes">{timeLeft.minutes}m </span>
        </>
      ) : (
        <span>Countdown not started or has ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;
