import React, { useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';
import Playlist from './components/playlist';
import moment from 'moment';

const token = 'BQCbd9dlfQhRn3-n3-ZwbucBaNl3Yx6YnufEIu2QqGV6F-fgzhM_gLSMcSCbPdYOImBUGx72zti7VUTBGBifqJhhYdqZwGTFBOU0oc20gW-OaShZG78wWR-cyvaHCuz365Fq82N_oxEwHzCFvrgFaZGt4Bujcn-RcAT_UArvvTR970zzo49Pk2kxNY1oHhimp32wEv7Z7A';

const getPlayList = (params) => {
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
  const [selectedDate, setSelectedDate] = React.useState(
    moment(new Date()).format('yyyy-mm-dd HH:mm:ss'),
  );

  const [filters, setFilters] = React.useState({
    locale: '',
    country: '',
    timestamp: '',
    limit: '50',
    offset: '1',
  });

  const getInitialData = async (params = '') => {
    const responsePlaylist = await getPlayList(params);
    if (responsePlaylist && responsePlaylist.playlists)
      setListMusic(responsePlaylist.playlists);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    let params = '';
    const keys = Object.keys(filters);
    const values = Object.values(filters);

    for(let i = 0; i < keys.length; i++){
      params += `${keys[i]}=${values[i]}&`
    }

    getInitialData(params);
  }, [filters]);

  return (
    <div className="App">
      <Filters setFilters={setFilters} />
      <Playlist
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        listMusic={listMusic || []}
      />
    </div>
  );
}

export default App;
