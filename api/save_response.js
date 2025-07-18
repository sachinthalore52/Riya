import mysql from 'mysql2/promise';
import fetch from 'node-fetch';

function simplifyUserAgent(ua) {
  if (!ua) return 'Unknown Device';

  const lowerUA = ua.toLowerCase();

  // Mac detection first (ignore any Android spoof)
  if (lowerUA.includes('macintosh') || lowerUA.includes('mac os x')) {
    return 'Mac OS - ' + detectBrowser(lowerUA);
  }

  // Windows detection
  if (lowerUA.includes('windows')) {
    return 'Windows - ' + detectBrowser(lowerUA);
  }

  // iPhone/iPad detection
  if (lowerUA.includes('iphone') || lowerUA.includes('ipad')) {
    return 'iOS - ' + detectBrowser(lowerUA);
  }

  // Android detection with version
  if (lowerUA.includes('android')) {
    const versionMatch = lowerUA.match(/android\s+([\d.]+)/);
    const version = versionMatch ? versionMatch[1] : '';
    return `Android ${version} - ${detectBrowser(lowerUA)}`;
  }

  // Linux or other devices
  if (lowerUA.includes('linux')) {
    return 'Linux - ' + detectBrowser(lowerUA);
  }

  return 'Unknown Device - ' + detectBrowser(lowerUA);
}

function detectBrowser(ua) {
  if (ua.includes('chrome')) return 'Chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('edg')) return 'Edge';
  return 'Unknown Browser';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const { response } = req.body;
      if (!response) return res.status(400).send('Invalid input');

      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = simplifyUserAgent(req.headers['user-agent']);

      let city = '', region = '', country = '';
      try {
        const loc = await fetch(`http://ip-api.com/json/${ip}`).then(r => r.json());
        city = loc.city || '';
        region = loc.regionName || '';
        country = loc.country || '';
      } catch (err) {
        console.warn('Location fetch failed:', err.message);
      }

      const connection = await mysql.createConnection({
        host: 'centerbeam.proxy.rlwy.net',
        port: 22353,
        user: 'root',
        password: 'BrEYLiPHKiaXpChPWGzsYqvwpaRgFKUq',
        database: 'railway'
      });

      await connection.execute(
        'INSERT INTO responses (response, ip_address, user_agent, city, region, country) VALUES (?, ?, ?, ?, ?, ?)',
        [response, ip, userAgent, city, region, country]
      );

      await connection.end();
      return res.status(200).send('Response saved!');
    } catch (error) {
      console.error('DB Error:', error.message);
      return res.status(500).send('Database error');
    }
  }

  res.status(405).end();
}
