import axios from 'axios';

const getFilters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const html = await axios.get(
        `http://www.mocky.io/v2/5a25fade2e0000213aa90776`,
      );
      resolve(html.data);
    } catch (error) {
      reject(error);
    }
  });
};
export default getFilters;
