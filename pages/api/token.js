// Path: pages\api\token.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.PROPEL_CLIENT_ID);
    params.append('client_secret', process.env.PROPEL_CLIENT_SECRET);

    const response = await axios.post(
      'https://auth.us-east-2.propeldata.com/oauth2/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.status(200).json({ accessToken: response.data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
