
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './ContentDisplay.css';

// Interface declarations for props and item structure
interface ContentDisplayProps {
  type: string;
  filter: string;
}

interface Item {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}

// Functional component for displaying content based on type and filter
const ContentDisplay: React.FC<ContentDisplayProps> = ({ type, filter }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch data on component mount or when type/filter changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Conditional fetching based on the presence of a filter
        if (filter) {
          const searchResponse = await api.get(`/search/${type}`, {
            params: { query: filter }
          });
          setItems(searchResponse.data.results);
        } else {
          const topRatedResponse = await api.get(`/${type}/top_rated`);
          setItems(topRatedResponse.data.results.slice(0, 10));
        }
      } catch (err: any) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, filter]);

  // Handler for item click, navigating to item details
  const handleItemClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  // Render loading, error, or no-results states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
 
  if (!isLoading && items.length === 0 && filter) {
    return (
      <div className="no-results">
        <img src="./src/pictures/No_result.png" alt="No Results" style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
        No results found for "{filter}".
      </div>
    );
  }

  // Main rendering logic for displaying items
  return (
    <div className="contentDisplay">
      {items.map(item => (
        <div key={item.id} style={{ width: 'calc(100% / 3 - 10px)', cursor: 'pointer' }} onClick={() => handleItemClick(item.id)}>
          <img
            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "path_to_default_image.jpg"}
            alt={item.title || item.name || "No title available"}
            style={{ width: '100%', height: 'auto' }}
          />
          <h3>{item.title || item.name || "Untitled"}</h3>
        </div>
      ))}
    </div>
  );
};


export default ContentDisplay;
