import AlbumCard from "./AlbumCard";
import "./AlbumList.css";

const AlbumList = ({ albums, artists = [] }) => {
  return (
    <div className="album-list">
      {albums.map((album) => {
        const artist = artists.find(
          (artist) => artist.id === album.artistId
        );

        return (
          <AlbumCard
            key={album.id}
            album={album}
            artistName={artist ? artist.name : "Unknown Artist"}
          />
        );
      })}
    </div>
  );
};

export default AlbumList;