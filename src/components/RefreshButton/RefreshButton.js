import React from 'react';
import './RefreshButton.css';

const RefreshButton = ({ onRefresh }) => {
  return (
    <button className="refresh-button" onClick={onRefresh}>
      Refresh
    </button>
  );
};

export default RefreshButton;
