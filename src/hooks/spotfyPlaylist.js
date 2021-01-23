import axios from 'axios';

const token =
  'BQDNMioR2ZMpqEvJZVtKpmQtzZtOLrbTR8ULJjzxI5rhs0GMzQCgbKB6pS_KgUskMA_0BzLtFeK_DDhYm9OKoh7-nnrrKm_J5hvIdlKNcFl2nSXY9ssb6deQhpj3HSaEy2HBtMfaS7kN6TsB1kmfICv7DOFwdumh9lZfTOSnjKbMk5zpTOFglzy09pCWtppDKQ4FZt69zA';

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
