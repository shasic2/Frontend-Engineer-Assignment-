import React, { useState, useEffect } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }): JSX.Element => {
  // Pokušaj dohvatiti prethodni upit iz localStorage ili postavi prazan string
  const [input, setInput] = useState<string>(localStorage.getItem('searchQuery') || '');
  const [timer, setTimer] = useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setInput(value); // Ažuriranje stanja s trenutnim unosom
    localStorage.setItem('searchQuery', value); // Spremanje trenutnog unosa u localStorage

    // Očistite postojeći tajmer ako postoji
    if (timer !== null) {
      clearTimeout(timer);
    }

    // Postavljanje novog tajmera za obradu unosa nakon kašnjenja
    const newTimer = setTimeout(() => {
      const processedValue = value.replace(/\s+/g, ' ').trim();
      if (processedValue) {
        if (processedValue.length >= 3) { // Provjera je li unos najmanje 3 znaka
          onSearch(processedValue);
        }
      } else {
        onSearch(''); // Resetiranje upita za pretraživanje kada je unos prazan
      }
    }, 1000) as unknown as number;

    setTimer(newTimer);
  };

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
