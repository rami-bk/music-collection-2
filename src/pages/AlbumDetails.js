
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlbumDetails.css";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingFavorite, setUpdatingFavorite] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAlbumById = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:3001/albums/${albumId}`
        );

        if (!response.ok) {
          throw new Error("Couldn't fetch album details.");
        }

        const albumData = await response.json();
        setAlbum(albumData);

        const artistResponse = await fetch(
          `http://localhost:3001/artists/${albumData.artistId}`
        );

        if (!artistResponse.ok) {
          throw new Error("Couldn't fetch artist details.");
        }

        const artistData = await artistResponse.json();
        setArtist(artistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchAlbumById();
    }
  }, [albumId]);

  const handleToggleFavorite = async () => {
    try {
      setUpdatingFavorite(true);
      setActionError("");

      const response = await fetch(
        `http://localhost:3001/albums/${albumId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFavorite: !album.isFavorite,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite status.");
      }

      const updatedAlbum = await response.json();
      setAlbum(updatedAlbum);
    } catch (error) {
      setActionError(error.message);
    } finally {
      setUpdatingFavorite(false);
    }
  };

  const handleDeleteAlbum = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this album?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setActionError("");

      const response = await fetch(
        `http://localhost:3001/albums/${albumId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete album.");
      }

      navigate("/albums");
    } catch (error) {
      setActionError(error.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <section className="album-details">
        <p>Loading album details...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="album-details">
        <p role="alert">{error}</p>
      </section>
    );
  }

  if (!album || !artist) {
    return (
      <section className="album-details">
        <p>Album details are unavailable.</p>
      </section>
    );
  }

  return (
    <section className="album-details">
      <div className="album-details-content">
        <img
          className="album-details-image"
          src={album.image}
          alt={`${album.title} album cover`}
        />

        <div className="album-details-info">
          <h1 className="album-details-title">{album.title}</h1>

          <p>
            <strong>Artist:</strong> {artist.name}
          </p>

          <p>
            <strong>Genre:</strong> {album.genre}
          </p>

          <p>
            <strong>Format:</strong> {album.type?.toUpperCase()}
          </p>

          <p>
            <strong>Favorite:</strong> {album.isFavorite ? "Yes" : "No"}
          </p>

          {actionError && <p role="alert">{actionError}</p>}

          <div className="album-details-actions">
            <button
              className="favorite-button"
              onClick={handleToggleFavorite}
              disabled={updatingFavorite || deleting}
              aria-pressed={Boolean(album.isFavorite)}
            >
              {updatingFavorite
                ? "Updating..."
                : album.isFavorite
                  ? "♥ Remove from Favorites"
                  : "♡ Add to Favorites"}
            </button>

            <button
              className="edit-button"
              onClick={() => navigate(`/albums/${albumId}/edit`)}
              disabled={deleting}
            >
              Edit Album
            </button>

            <button
              className="delete-button"
              onClick={handleDeleteAlbum}
              disabled={deleting || updatingFavorite}
            >
              {deleting ? "Deleting..." : "Delete Album"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumDetails;
