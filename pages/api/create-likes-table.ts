import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result =
      await sql`CREATE TABLE Likes ( postId varchar(255), Likes numeric(5) );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
  
}