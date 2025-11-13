// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stringify } from 'querystring';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  try {
    const refreshToken = req.query.refresh_token;
    const url = `${process.env.SPOTIFY_API_URL}/api/token`;
    const headers = {
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
        ).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      delete data.scope;
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: 'refresh_token_fail' });
    }
  } catch {
    res.status(500).json({ error: 'refresh_token_fail' });
  }
}
