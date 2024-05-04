import React from 'react';
import './TabSwitcher.css'; 

// Define the type for the props expected by the TabSwitcher component
type TabSwitcherProps = {
  onChangeTab: (tab: 'movie' | 'tv') => void;  // Function to call when tab changes
};

// Functional component for switching between 'movie' and 'tv' tabs
const TabSwitcher: React.FC<TabSwitcherProps> = ({ onChangeTab }) => {
  return (
    <div className="TabSwitcher">
      <button onClick={() => onChangeTab('movie')}>Movies</button>
      <button onClick={() => onChangeTab('tv')}>TV Shows</button>
    </div>
  );
};

export default TabSwitcher; 
