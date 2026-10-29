
import { useState, useEffect } from "react";
import ArtistList from "../components/ArtistList";
import "./Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:3001/artists");

        if (!response.ok) {
          throw new Error("Couldn't fetch artists.");
        }

        const artistData = await response.json();
        setArtists(artistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <section className="artists-page">
      <h1 className="page-title">Artists</h1>

      {loading && <p>Loading artists...</p>}

      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && artists.length === 0 && (
        <p>No artists yet. Add an album to start your collection!</p>
      )}

      {!loading && !error && artists.length > 0 && (
        <ArtistList artists={artists} />
      )}
    </section>
  );
};

export default Artists;
