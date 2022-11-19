// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { stringify } from 'querystring';

type Data = {
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let refresh_token = req.query.refresh_token;
  let url = `${process.env.SPOTIFY_API_URL}/api/token`;
  let headers = {
    "Authorization": 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
    "Content-Type": "application/x-www-form-urlencoded",
  }
  let body = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  }

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: stringify(body),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        delete data.scope;
        res.send(data);
      });
    } else {
      res.status(response.status).send({ error: "refresh_token_fail" });
    }
  });
}
