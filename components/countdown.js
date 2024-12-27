import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      // If the current time is before the start date or after the end date
      if (now < start) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsActive(false);
        return;
      } else if (now >= end) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsActive(false);
        return;
      }

      setIsActive(true);
      const timeDiff = end - now; // in milliseconds
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  return (
    <div className="counter">
      {isActive ? (
        <>
          <span className="hour">{timeLeft.hours}h</span>
          <span className="minutes">{timeLeft.minutes}m</span>
          <span className="seconds">{timeLeft.seconds}s</span>
        </>
      ) : (
        <span>Countdown not started or has ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;