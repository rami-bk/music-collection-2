
import { Routes, Route, Navigate } from "react-router-dom";
import Layouts from "./layouts/Layout";

import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Artists from "./pages/Artists";
import ArtistDetails from "./pages/ArtistDetails";
import AddAlbum from "./pages/AddAlbum";
import FavoriteAlbums from "./pages/FavoriteAlbums";
import FavoriteArtists from "./pages/FavoriteArtists";
import NotFound from "./pages/NotFound";
import EditAlbum from "./pages/EditAlbum";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route
          index
          element={<Navigate to="/albums" replace />}
        />

        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId" element={<AlbumDetails />} />
        <Route path="albums/:albumId/edit" element={<EditAlbum />} />

        <Route path="artists" element={<Artists />} />
        <Route path="artists/:artistId" element={<ArtistDetails />} />

        <Route path="add" element={<AddAlbum />} />

        <Route
          path="favorite-albums"
          element={<FavoriteAlbums />}
        />

        <Route
          path="favorite-artists"
          element={<FavoriteArtists />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
