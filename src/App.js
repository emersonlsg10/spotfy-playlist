import React, { useEffect } from 'react';
import axios from 'axios';
import Filters from './components/filters';

const getPlayList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `https://api.spotify.com/v1/browse/featured-playlists`,
        {
          headers: {
            Authorization: `Bearer BQA8CJ30Ub43VUFNuycfRgkPvojPcwS05Hp4Gnm9v3PhjOGnPqqWy0M93bNrU8nUVk4IIT-q1UOXdRst_W53G47xEEwBxitMoTrao87ziXjIHllO_SecPbPiHUCpdt3xkvce3ngbsRLltkt08sK9cjHjOqgxquvgBT1cqD2IQ6J3MpbsgtfXjRGLOH5PcJ_DoA`,
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

  useEffect(() => {
    const getInitialData = async () => {
      const responsePlaylist = await getPlayList();
      console.log(responsePlaylist, 'teste');
    };
    getInitialData();
  }, []);

  return (
    <div className="App">
      <Filters />
    </div>
  );
}

export default App;
