import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: 'centerbeam.proxy.rlwy.net',
      port: 22353,
      user: 'root',
      password: 'BrEYLiPHKiaXpChPWGzsYqvwpaRgFKUq',
      database: 'railway'
    });

    const [rows] = await connection.execute('SELECT * FROM responses ORDER BY created_at DESC');
    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
}
