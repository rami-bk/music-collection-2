
import { useState, useEffect } from "react";
import AlbumList from "../components/AlbumList";
import SearchBar from "../components/SearchBar";
import "./Albums.css";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlbums = albums.filter((album) => {
    const search = searchTerm.toLowerCase().trim();

    const artist = artists.find(
      (artist) => String(artist.id) === String(album.artistId)
    );

    const artistName = artist ? artist.name : "";

    return (
      album.title.toLowerCase().includes(search) ||
      artistName.toLowerCase().includes(search) ||
      album.genre.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const getAlbums = async () => {
      try {
        setError("");
        setLoading(true);

        const response = await fetch(
          "http://localhost:3001/albums"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch albums.");
        }

        const albumData = await response.json();
        setAlbums(albumData);

        const artistResponse = await fetch(
          "http://localhost:3001/artists"
        );

        if (!artistResponse.ok) {
          throw new Error("Failed to fetch artists.");
        }

        const artistData = await artistResponse.json();
        setArtists(artistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getAlbums();
  }, []);

  return (
    <section className="albums-page">
      <h1 className="page-title">Albums</h1>

      <div className="albums-toolbar">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {loading && <p>Loading albums...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading && !error && albums.length === 0 && (
        <p>Your collection is empty. Add your first album!</p>
      )}

      {!loading && !error && albums.length > 0 &&
        filteredAlbums.length === 0 && (
          <p>No albums match your search.</p>
        )}

      {!loading && !error && filteredAlbums.length > 0 && (
        <AlbumList
          albums={filteredAlbums}
          artists={artists}
        />
      )}
    </section>
  );
};

export default Albums;
