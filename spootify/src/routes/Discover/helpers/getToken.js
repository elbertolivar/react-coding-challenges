import axios from 'axios';
import qs from 'querystring';
import config from '../../../config';

export default async function getToken() {
    const { data: { access_token: token } } = await axios.post(
        config.api.authUrl,
        qs.stringify({ 'grant_type': 'client_credentials' }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${config.api.clientId}:${config.api.clientSecret}`)}`
            }
        }
    );

    return token;
}