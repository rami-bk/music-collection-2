
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import "./EditAlbum.css";

const EditAlbum = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [albumResponse, artistsResponse] = await Promise.all([
          fetch(`http://localhost:3001/albums/${albumId}`),
          fetch("http://localhost:3001/artists"),
        ]);

        if (!albumResponse.ok) {
          throw new Error("Couldn't load album details.");
        }

        if (!artistsResponse.ok) {
          throw new Error("Couldn't load artists.");
        }

        const [albumData, artistsData] = await Promise.all([
          albumResponse.json(),
          artistsResponse.json(),
        ]);

        setAlbum(albumData);
        setArtists(artistsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (albumId) {
      fetchData();
    }
  }, [albumId]);

  const handleUpdateAlbum = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      let selectedArtistId = formData.artistId;

      if (selectedArtistId === "new") {
        const artistResponse = await fetch(
          "http://localhost:3001/artists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.newArtistName.trim(),
              isFavorite: false,
            }),
          }
        );

        if (!artistResponse.ok) {
          throw new Error("Failed to create new artist.");
        }

        const newArtist = await artistResponse.json();
        selectedArtistId = newArtist.id;
      }

      if (
        selectedArtistId === undefined ||
        selectedArtistId === null ||
        selectedArtistId === "" ||
        selectedArtistId === "new"
      ) {
        throw new Error("Please select a valid artist.");
      }

      const updatedAlbumData = {
        title: formData.title,
        genre: formData.genre,
        type: formData.type,
        image: formData.image,
        artistId: selectedArtistId,
        isFavorite: album.isFavorite,
      };

      const response = await fetch(
        `http://localhost:3001/albums/${albumId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAlbumData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update album.");
      }

      const updatedAlbum = await response.json();
      setAlbum(updatedAlbum);

      navigate(`/albums/${albumId}`);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="edit-album-page">
        <p>Loading album...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="edit-album-page">
        <p role="alert">{error}</p>
      </section>
    );
  }

  if (!album) {
    return (
      <section className="edit-album-page">
        <p>Album not found.</p>
      </section>
    );
  }

  return (
    <section className="edit-album-page">
      <h1 className="page-title">Edit Album</h1>

      <div className="edit-album-form-container">
        <AlbumForm
          artists={artists}
          initialData={album}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={handleUpdateAlbum}
        />
      </div>
    </section>
  );
};

export default EditAlbum;
