import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import TabSwitcher from './components/TabSwitcher';
import ContentDisplay from './components/ContentDisplay';
import SearchBox from './components/SearchBox';
import ItemDetails from './components/ItemDetails'; 
import './App.css';

const App: React.FC = () => {
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
};


const AppContent: React.FC<{ selectedTab: string; onTabChange: (tab: string) => void; onSearchChange: (query: string) => void; searchQuery: string; }> = ({ selectedTab, onTabChange, onSearchChange, searchQuery }) => {
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
};


export default App;
