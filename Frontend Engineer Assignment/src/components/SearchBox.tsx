// src/SearchBox.tsx
import React, { useState, useEffect } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value); // Update state with the raw input

    // Clear the existing timer if there is one
    if (timer !== null) {
      clearTimeout(timer);
    }

    // Set a new timer to process the input after a delay
    const newTimer = setTimeout(() => {
      const processedValue = value.replace(/\s+/g, ' ').trim();
      if (processedValue) {
        if (processedValue.length >= 3) { // Check to ensure the input is at least 3 characters
          onSearch(processedValue);
        }
      } else {
        onSearch(''); // Reset the search query when input is empty
      }
    }, 1000); // Set the delay for 1 second
  
    setTimer(newTimer);
  };

  // Effect for cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <input
      className="search-input"
      type="text"
      value={input}
      onChange={handleChange}
      placeholder="Search by title..."
    />
  );
};

export default SearchBox;
