import axios from 'axios';

const token =
  'BQBuQ27GnhGSMIqXHr2P2ZSwrpyotMOKrB5b3pz8JYv79GDB1fVDboxxuHP9uDv0ABw6SZWi6gmYzpbEwjTzEXELDJKX3cDT-w2GMaccDB184svvVKuAy9-8fuXM-kB1xPvqOPiNsc-I38B5oxXahixLpBWPu7JG2XLdRk2RVARj7ryTiHwU8bZYfmJzL3e3kC_IvzNRzw';

const concatParams = filters => {
  let params = '';
  const keys = Object.keys(filters);
  const values = Object.values(filters);

  for (let i = 0; i < keys.length; i++) {
    params += `${keys[i]}=${values[i]}&`;
  }
  return params;
};

const callSpotfy = (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `https://api.spotify.com/v1/browse/featured-playlists?${concatParams(filters)}`,
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
export default callSpotfy;
