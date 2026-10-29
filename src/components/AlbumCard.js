
import { Link } from "react-router-dom";
import "./AlbumCard.css";

const AlbumCard = ({ album, artistName }) => {
  return (
    <Link to={`/albums/${album.id}`} className="album-card-link">
      <div className="album-card">
        <img
          className="album-card-image"
          src={album.image}
          alt={`${album.title} album cover`}
        />

        <h2 className="album-card-title">{album.title}</h2>
        <p className="album-card-artist">{artistName}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
