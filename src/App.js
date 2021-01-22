import React, { useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import Playlist from './components/playlist';

const getPlayList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `https://api.spotify.com/v1/browse/featured-playlists`,
        {
          headers: {
            Authorization: `Bearer BQAS_htnZD4vBYv8xMUReabWsTy1fFUWcKp8Y8eA8WNL9q-a_Nx-98hKbb3nRajKjyrWqI-nBSD82suwpHtJ34tWkODJ-1reyE7xVg_QfVLEmz6g7eVAC7jtiWXtXT0UU5XuswOq5QvR-hdheVge57c1F43GvesQNoCCHeKjN2ubZ-l232h78eylwPDxuVjlFg`,
          },
        },
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};

function App() {
  const [listMusic, setListMusic] = React.useState(null);
  useEffect(() => {
    const getInitialData = async () => {
      const responsePlaylist = await getPlayList();
      if (responsePlaylist && responsePlaylist.playlists)
        setListMusic(responsePlaylist.playlists);
    };
    getInitialData();
  }, []);

  return (
    <div className="App">
      <Filters />
      <Playlist listMusic={listMusic || []}/>
    </div>
  );
}

export default App;
