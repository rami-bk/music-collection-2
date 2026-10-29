
import { useState, useEffect } from "react";
import ArtistList from "../components/ArtistList";
import "./FavoriteArtists.css";

const FavoriteArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavoriteArtists = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3001/artists");

        if (!response.ok) {
          throw new Error("Failed to fetch artists.");
        }

        const artistsData = await response.json();

        setArtists(
          artistsData.filter((artist) => artist.isFavorite === true)
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteArtists();
  }, []);

  return (
    <section className="favorite-artists-page">
      <h1 className="page-title">Favorite Artists</h1>

      {loading && <p>Loading favorite artists...</p>}

      {!loading && error && (
        <p className="page-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && artists.length === 0 && (
        <p className="no-favorites">
          You haven't added any favorite artists yet.
        </p>
      )}

      {!loading && !error && artists.length > 0 && (
        <ArtistList artists={artists} />
      )}
    </section>
  );
};

export default FavoriteArtists;
