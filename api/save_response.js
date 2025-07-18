import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;
      const response = data.response;

      // Railway DB credentials (apne values yahan dal do)
      const connection = await mysql.createConnection({
        host: "centerbeam.proxy.rlwy.net",
        user: "root",
        password: "BrEYLiPHKiaXpChPWGzsYqvwpaRgFKUq",  // Railway se jo password mila hai wo
        database: "railway",
        port: 22353
      });

      await connection.execute(
        'INSERT INTO responses (response, ip_address, user_agent) VALUES (?, ?, ?)',
        [response, req.socket.remoteAddress, req.headers['user-agent']]
      );

      await connection.end();
      return res.status(200).send("Response saved!");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Database error");
    }
  }

  return res.status(405).send("Method Not Allowed");
}
