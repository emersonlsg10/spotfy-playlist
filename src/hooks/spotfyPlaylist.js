import axios from 'axios';

const token =
  'BQCXpeJ4tlcgLcfe8rVfCHjhOPQpvfvD_I1oY60g7Ljwy2SE-fE4CvHjbrDOJhUopfAPSySWDuD94PcBxtvKQqnWvMAznGibMERBWKpuXonQIUG4oaj8qSr7NbDBYvWdg9S9lsq08a467ybWoVbNlG0vBC70LX04Hj4R138nN6E9Hb6U82ir8TrrfJTYwj__KgX4qnlcFw';

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
