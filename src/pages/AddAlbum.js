
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import "./AddAlbum.css";

const AddAlbum = () => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const handleAddAlbum = async (albumData) => {
    try {
      setIsSubmitting(true);
      setError("");

      let selectedArtistId = albumData.artistId;

      if (selectedArtistId === "new") {
        const artistResponse = await fetch(
          "http://localhost:3001/artists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: albumData.newArtistName.trim(),
              isFavorite: false,
            }),
          }
        );

        if (!artistResponse.ok) {
          throw new Error("Failed to add artist.");
        }

        const createdArtist = await artistResponse.json();
        selectedArtistId = createdArtist.id;
      }

      const newAlbum = {
        title: albumData.title,
        genre: albumData.genre,
        type: albumData.type,
        image: albumData.image,
        artistId: selectedArtistId,
        isFavorite: false,
      };

      const albumResponse = await fetch(
        "http://localhost:3001/albums",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAlbum),
        }
      );

      if (!albumResponse.ok) {
        throw new Error("Failed to add album.");
      }

      const createdAlbum = await albumResponse.json();
      navigate(`/albums/${createdAlbum.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setFetchError("");
        setLoading(true);

        const response = await fetch("http://localhost:3001/artists");

        if (!response.ok) {
          throw new Error("Failed to load artists.");
        }

        const artistData = await response.json();
        setArtists(artistData);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <section className="add-album-page">
      <h1 className="page-title">Add Album</h1>

      {loading && <p>Loading artists...</p>}

      {!loading && fetchError && (
        <p className="form-error" role="alert">
          {fetchError}
        </p>
      )}

      {!loading && !fetchError && (
        <div className="add-album-form-container">
          <AlbumForm
            artists={artists}
            onSubmit={handleAddAlbum}
            isSubmitting={isSubmitting}
            submitError={error}
          />
        </div>
      )}
    </section>
  );
};

export default AddAlbum;
