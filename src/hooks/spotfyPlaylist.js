import axios from 'axios';

const token =
  'BQDNMioR2ZMpqEvJZVtKpmQtzZtOLrbTR8ULJjzxI5rhs0GMzQCgbKB6pS_KgUskMA_0BzLtFeK_DDhYm9OKoh7-nnrrKm_J5hvIdlKNcFl2nSXY9ssb6deQhpj3HSaEy2HBtMfaS7kN6TsB1kmfICv7DOFwdumh9lZfTOSnjKbMk5zpTOFglzy09pCWtppDKQ4FZt69zA';

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
export default callSpotfy;