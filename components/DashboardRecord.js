import React from "react";

const DashboardRecord = ({ image, score, title }) => {
  return (
    <div className="records-box">
      <img src={image} alt={title} />
      <div className="score-title">
        <span className="score">{score}</span>
        <h6 className="title">{title}</h6>
      </div>
    </div>
  );
};

export default DashboardRecord;
