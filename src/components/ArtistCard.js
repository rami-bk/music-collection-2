
import { Link } from "react-router-dom";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
  return (
    <Link to={`/artists/${artist.id}`} className="artist-card-link">
      <div className="artist-card">
        <h2 className="artist-card-name">{artist.name}</h2>
      </div>
    </Link>
  );
};

export default ArtistCard;
