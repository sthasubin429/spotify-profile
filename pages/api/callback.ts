// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';

type Data = {
  name: string,
}
let stateKey = 'spotify_auth_state';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  let url = 'https://accounts.spotify.com/api/token';
  let body = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
  };
  let headers = {
    "Authorization": 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
    "Content-Type": "application/x-www-form-urlencoded",
  }

  if (state === null) {
    res.redirect(`/#${stringify({ error: 'state_mismatch' })}`);
  } else {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: stringify(body),
    }
    ).then((data) => {
      if (data.ok) {
        data.json().then((response) => {
          console.log(response);
        })
      } else {
        res.redirect(`/#${stringify({ error: 'invalid_token' })}`);
      }
    });
  }
}
