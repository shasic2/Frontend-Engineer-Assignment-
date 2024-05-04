import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';  // Importing your API configuration
import './ItemDetails.css';

interface Item {
  id: number;
  title?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  genres?: { id: number; name: string }[];
  backdrop_path?: string;
  videos?: {
    results: [
      {
        id: string;
        key: string;  // YouTube video key for embedding trailers
        site: string;  // Specifies the video platform, e.g., "YouTube"
        type: string;  // Video type, typically "Trailer"
      }
    ];
  };
}

interface State {
  item: Item | null;
  isLoading: boolean;
  error: string | null;
}

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Retrieve 'id' from the URL parameters
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ item: null, isLoading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch item details and related videos in a single API call
        const response = await api.get(`/movie/${id}?append_to_response=videos`);
        setState({ item: response.data, isLoading: false, error: null });
      } catch (error: any) {
        setState({ item: null, isLoading: false, error: 'Error fetching item details' });
        console.error('Error fetching item details:', error);
      }
    };
    fetchData();
  }, [id]); // Dependency array to trigger re-fetch when 'id' changes

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  if (state.isLoading) return <div>Loading...</div>;
  if (state.error) return <div>{state.error}</div>;
  if (!state.item) return <div>No data available.</div>;

  const hasTrailer = state.item.videos?.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');

  return (
    <div className="item-details-container">
      <button onClick={handleBack} className="button">Back</button>
      <br />
      {hasTrailer ? (
        <iframe
          title="trailer"
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${hasTrailer.key}`}
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src={state.item.backdrop_path ? `https://image.tmdb.org/t/p/w500${state.item.backdrop_path}` : "path_to_default_image.jpg"}
          alt={state.item.title || "No title available"}
        />
      )}
      <h2>{state.item.title || "Untitled"}</h2>
      <p>{state.item.overview || "No description available."}</p>
      <p><strong>Release Date: </strong>{state.item.release_date || "Unknown"}</p>
      <p><strong>Genres:</strong> {state.item.genres?.map(genre => genre.name).join(', ') || "No genres available."}</p>
    </div>
  );
};

export default ItemDetails;
