// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stringify } from 'querystring';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { encodeParams } from '../../utils';
import { stateKey } from '../../utils/constant';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = await getCookie(stateKey, { req, res });

  let url = `${process.env.SPOTIFY_API_URL}/api/token`;
  let body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REDIRECT_URI
  };
  let headers = {
    Authorization:
      'Basic ' +
      Buffer.from(
        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
      ).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  if (state === null || state !== storedState) {
    res.redirect(`/?${encodeParams({ error: 'state_mismatch' })}`);
  } else {
    fetch(url, {
      method: 'POST',
      headers,
      body: stringify(body)
    }).then(data => {
      if (data.ok) {
        data.json().then(response => {
          delete response.scope;
          res.redirect(`${process.env.FRONTEND_URI}?${encodeParams(response)}`);
        });
      } else {
        res.redirect(`/?${encodeParams({ error: 'invalid_token' })}`);
      }
    });
  }
}
