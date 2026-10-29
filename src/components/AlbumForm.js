
import { useState, useEffect } from "react";
import "./AlbumForm.css";

const AlbumForm = ({
  artists = [],
  onSubmit,
  isSubmitting = false,
  submitError = "",
  initialData = null,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [type, setType] = useState(initialData?.type || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [artistId, setArtistId] = useState(
    initialData?.artistId != null
      ? String(initialData.artistId)
      : ""
  );

  const [newArtistName, setNewArtistName] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setGenre(initialData?.genre || "");
    setType(initialData?.type || "");
    setImage(initialData?.image || "");
    setArtistId(
      initialData?.artistId != null
        ? String(initialData.artistId)
        : ""
    );
    setNewArtistName("");
    setValidationError("");
  }, [
    initialData?.id,
    initialData?.title,
    initialData?.genre,
    initialData?.type,
    initialData?.image,
    initialData?.artistId,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (
      !title.trim() ||
      !genre.trim() ||
      !type ||
      !image.trim() ||
      !artistId ||
      (artistId === "new" && !newArtistName.trim())
    ) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    onSubmit({
      title: title.trim(),
      genre: genre.trim(),
      type,
      image: image.trim(),
      artistId,
      newArtistName: newArtistName.trim(),
    });
  };

  return (
    <form className="album-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="album-title">Title</label>
        <input
          required
          type="text"
          id="album-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="album-genre">Genre</label>
        <input
          required
          type="text"
          id="album-genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="album-type">Type</label>
        <select
          required
          id="album-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">Select Type</option>
          <option value="cd">CD</option>
          <option value="vinyl">Vinyl</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="album-image">Image URL</label>
        <input
          required
          type="url"
          id="album-image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="album-artist">Artist</label>
        <select
          required
          id="album-artist"
          value={artistId}
          onChange={(e) => {
            setArtistId(e.target.value);
            setNewArtistName("");
          }}
          disabled={isSubmitting}
        >
          <option value="">Select an Artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
          <option value="new">Add New Artist</option>
        </select>

        {artistId === "new" && (
          <div className="form-field new-artist-field">
            <label htmlFor="new-artist-name">New Artist Name</label>
            <input
              required
              type="text"
              id="new-artist-name"
              value={newArtistName}
              onChange={(e) => setNewArtistName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>

      {validationError && (
        <p className="form-error" role="alert">
          {validationError}
        </p>
      )}

      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : initialData
            ? "Update Album"
            : "Add Album"}
      </button>
    </form>
  );
};

export default AlbumForm;
