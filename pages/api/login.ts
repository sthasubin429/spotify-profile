import { stringify } from 'querystring';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { scope, stateKey } from '../../utils/constant';

type Data = {
  name: string;
};

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function (length: number): string {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  let state = generateRandomString(16);
  setCookie(stateKey, state, { req, res, maxAge: 60 * 60 * 24 });

  res.redirect(
    `${process.env.SPOTIFY_API_URL}/authorize?` +
      stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope,
        redirect_uri: process.env.REDIRECT_URI,
        state
      })
  );
}
