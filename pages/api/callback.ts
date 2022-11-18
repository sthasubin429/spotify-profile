// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie, getCookies } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import { encodeParams } from '../../utils';
import { stateKey } from '../../utils/constant';

type Data = {
  name: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = getCookie(stateKey, { req, res });;

  let url = `${process.env.SPOTIFY_API_URL}/api/token`;
  let body = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
  };
  let headers = {
    "Authorization": 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
    "Content-Type": "application/x-www-form-urlencoded",
  }

  if (state === null || state !== storedState) {
    res.redirect(`/?${encodeParams({ error: 'state_mismatch' })}`);
  } else {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: stringify(body),
    }
    ).then((data) => {
      if (data.ok) {
        data.json().then((response) => {
          res.redirect(
            `${process.env.FRONTEND_URI}?${encodeParams(response)}`,
          );
        })
      } else {
        res.redirect(`/?${encodeParams({ error: 'invalid_token' })}`);
      }
    });
  }
}
