import React, { useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import Playlist from './components/playlist';
import moment from 'moment';

const token =
  'BQCbd9dlfQhRn3-n3-ZwbucBaNl3Yx6YnufEIu2QqGV6F-fgzhM_gLSMcSCbPdYOImBUGx72zti7VUTBGBifqJhhYdqZwGTFBOU0oc20gW-OaShZG78wWR-cyvaHCuz365Fq82N_oxEwHzCFvrgFaZGt4Bujcn-RcAT_UArvvTR970zzo49Pk2kxNY1oHhimp32wEv7Z7A';

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
