import { NextApiRequest, NextApiResponse } from 'next';

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  });
};

export default handler;
