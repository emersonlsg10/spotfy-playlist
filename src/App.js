import React, { useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import Playlist from './components/playlist';

const token =
  'BQCBaWagplxGvAMEjeA33wLHG-bNtYQLvd2kv709wNrPlZHv450FHos2eWCMamwF9nXVwNC8rQVwvThuDspG7ORz-olHVR1w3AxNDvsu1xDH11jNcwKD6YTXTdRao9th71eEHCTAM7gMZVwNdsyeko-e2SvtX0G7eAmyoHj6BYbOn4BQfdOrAqIC7lbmpEFh-zUPWcHVSA';

const callSpotfy = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `https://api.spotify.com/v1/browse/featured-playlists?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const [filters, setFilters] = React.useState({
    locale: '',
    country: '',
    timestamp: '',
    limit: '50',
    offset: '1',
  });

  const getPlayList = async (params = '') => {
    const responsePlaylist = await callSpotfy(params);
    if (responsePlaylist && responsePlaylist.playlists)
      setListMusic(responsePlaylist.playlists);
  };

  const concatParams = () => {
    let params = '';
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    for (let i = 0; i < keys.length; i++) {
      params += `${keys[i]}=${values[i]}&`;
    }
    return params;
  };

  useEffect(() => {
    getPlayList();
  }, []);

  useEffect(() => {
    getPlayList(concatParams());
  }, [filters]);

  return (
    <div className="App">
      <Filters setFilters={setFilters} />
      <Playlist listMusic={listMusic || []} />
    </div>
  );
}

export default App;
