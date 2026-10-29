import "./ArtistList.css";
import ArtistCard from "./ArtistCard";

const ArtistList = ({ artists = [] }) => {
  return (
    <div className="artist-list">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
        />
      ))}
    </div>
  );
};

export default ArtistList;
