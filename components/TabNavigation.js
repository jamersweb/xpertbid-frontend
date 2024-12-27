import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <ul className="nav nav-tabs bid-tabs-child" role="tablist">
      {tabs.map((tab) => (
        <li
          className="nav-item col-sm-4 col-12 bid-tabs-anchor"
          role="presentation"
          key={tab.id}
        >
          <button
            className={`nav-link w-100 ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            type="button"
            role="tab"
          >
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabNavigation;
