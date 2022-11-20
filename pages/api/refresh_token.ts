// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stringify } from 'querystring';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  let refreshToken = req.query.refresh_token;
  let url = `${process.env.SPOTIFY_API_URL}/api/token`;
  let headers = {
    Authorization:
      'Basic ' +
      Buffer.from(
        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRETx
      ).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded' // eslint-disable-line @typescript-eslint/naming-convention
  };
  let body = {
    grant_type: 'refresh_token', // eslint-disable-line @typescript-eslint/naming-convention
    refresh_token: refreshToken // eslint-disable-line @typescript-eslint/naming-convention
  };

  fetch(url, {
    method: 'POST',
    headers,
    body: stringify(body)
  }).then(response => {
    if (response.ok) {
      response.json().then(data => {
        delete data.scope;
        res.send(data);
      });
    } else {
      res.status(response.status).send({ error: 'refresh_token_fail' });
    }
  });
}
