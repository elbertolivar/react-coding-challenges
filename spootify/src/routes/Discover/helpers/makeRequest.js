import axios from 'axios';
import config from '../../../config';

export default async function makeRequest(path, token) {
  const { data } = await axios.get(
    `${config.api.baseUrl}/browse/${path}?locale=en_US`,
    {  headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
}

