import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { response } = req.body;
      if (!response) {
        return res.status(400).send('Invalid input');
      }

      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'] || '';

      // DB connection
      const connection = await mysql.createConnection({
        host: 'sql311.infinityfree.com',
        user: 'if0_39495117',
        password: 's9982453356',
        database: 'if0_39495117_responses_db'
      });

      await connection.execute(
        'INSERT INTO responses (response, ip_address, user_agent) VALUES (?, ?, ?)',
        [response, ip, userAgent]
      );

      await connection.end();

      return res.status(200).send('Response saved!');
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).send('Database error');
    }
  }

  res.status(405).send('Method not allowed');
}
