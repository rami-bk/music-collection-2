
import { useState, useEffect } from "react";
import AlbumList from "../components/AlbumList";
import "./FavoriteAlbums.css";

const FavoriteAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavoriteAlbums = async () => {
      try {
        setLoading(true);
        setError("");

        const [albumsResponse, artistsResponse] = await Promise.all([
          fetch("http://localhost:3001/albums"),
          fetch("http://localhost:3001/artists"),
        ]);

        if (!albumsResponse.ok) {
          throw new Error("Failed to fetch albums.");
        }

        if (!artistsResponse.ok) {
          throw new Error("Failed to fetch artists.");
        }

        const [albumsData, artistsData] = await Promise.all([
          albumsResponse.json(),
          artistsResponse.json(),
        ]);

        setAlbums(
          albumsData.filter((album) => album.isFavorite === true)
        );
        setArtists(artistsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteAlbums();
  }, []);

  return (
    <section className="favorite-albums-page">
      <h1 className="page-title">Favorite Albums</h1>

      {loading && <p>Loading favorite albums...</p>}

      {!loading && error && (
        <p className="page-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && albums.length === 0 && (
        <p className="no-favorites">
          You haven't added any favorite albums yet.
        </p>
      )}

      {!loading && !error && albums.length > 0 && (
        <AlbumList albums={albums} artists={artists} />
      )}
    </section>
  );
};

export default FavoriteAlbums;
