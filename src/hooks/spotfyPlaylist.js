import axios from 'axios';

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
export default callSpotfy;