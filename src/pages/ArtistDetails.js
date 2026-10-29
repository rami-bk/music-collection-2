
import "./ArtistDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AlbumList from "../components/AlbumList";

const ArtistDetails = () => {
  const { artistId } = useParams();

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteError, setFavoriteError] = useState("");
  const [updatingFavorite, setUpdatingFavorite] = useState(false);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const artistResponse = await fetch(
          `http://localhost:3001/artists/${artistId}`
        );

        if (!artistResponse.ok) {
          throw new Error("Failed to fetch artist details.");
        }

        const artistData = await artistResponse.json();
        setArtist(artistData);

        const albumsResponse = await fetch(
          "http://localhost:3001/albums"
        );

        if (!albumsResponse.ok) {
          throw new Error("Failed to fetch albums.");
        }

        const albumsData = await albumsResponse.json();

        const artistAlbums = albumsData.filter(
          (album) => String(album.artistId) === String(artistId)
        );

        setAlbums(artistAlbums);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtistDetails();
    }
  }, [artistId]);

  const handleToggleFavorite = async () => {
    try {
      setUpdatingFavorite(true);
      setFavoriteError("");

      const response = await fetch(
        `http://localhost:3001/artists/${artistId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFavorite: !artist.isFavorite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status.");
      }

      const updatedArtist = await response.json();
      setArtist(updatedArtist);
    } catch (error) {
      setFavoriteError(error.message);
    } finally {
      setUpdatingFavorite(false);
    }
  };

  return (
    <section className="artist-details">
      {loading && <p>Loading artist details...</p>}

      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && artist && (
        <>
          <h1 className="artist-details-title">{artist.name}</h1>

          <div className="artist-details-info">
            <p>
              Favorite: {artist.isFavorite ? "Yes" : "No"}
            </p>

            <button
              className="favorite-button"
              onClick={handleToggleFavorite}
              disabled={updatingFavorite}
              aria-pressed={Boolean(artist.isFavorite)}
            >
              {updatingFavorite
                ? "Updating..."
                : artist.isFavorite
                  ? "♥ Remove from Favorites"
                  : "♡ Add to Favorites"}
            </button>

            {favoriteError && (
              <p role="alert">{favoriteError}</p>
            )}
          </div>

          <h2 className="artist-albums-title">Albums</h2>

          {albums.length > 0 ? (
            <AlbumList albums={albums} artists={[artist]} />
          ) : (
            <p>No albums found for this artist.</p>
          )}
        </>
      )}
    </section>
  );
};

export default ArtistDetails;
