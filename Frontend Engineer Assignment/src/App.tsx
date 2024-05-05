import React, { useState } from 'react'; // Reintroduced React import
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

import TabSwitcher from './components/TabSwitcher';
import ContentDisplay from './components/ContentDisplay';
import SearchBox from './components/SearchBox';
import ItemDetails from './components/ItemDetails';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState('movie');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <AppContent
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
    </Router>
  );
}

function AppContent({ selectedTab, onTabChange, onSearchChange, searchQuery }) {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/details/');

  return (
    <div className="App">
      {!isDetailPage && (
        <>
          <br />
          <TabSwitcher onChangeTab={onTabChange} />
          <br />
          <SearchBox onSearch={onSearchChange} />
          <br />
        </>
      )}
      <Routes>
        <Route path="/" element={<ContentDisplay type={selectedTab} filter={searchQuery} />} />
        <Route path="/details/:id" element={<ItemDetails />} />
      </Routes>
    </div>
  );
}

// Adding PropTypes
AppContent.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default App;
