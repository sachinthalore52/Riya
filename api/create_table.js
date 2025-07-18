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

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        response VARCHAR(10),
        ip_address VARCHAR(45),
        user_agent TEXT,
        city VARCHAR(100),
        region VARCHAR(100),
        country VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    await connection.end();

    res.status(200).send("Table 'responses' created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating table: " + error.message);
  }
}
