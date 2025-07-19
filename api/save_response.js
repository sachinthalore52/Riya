import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://comdfcrvqifcbtntdofs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbWRmY3J2cWlmY2J0bnRkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDc1MzAsImV4cCI6MjA2ODUyMzUzMH0.usg1Sp-yMteILv5qwgEd6hsvrZ10TVe42_9-z7tKJaU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function simplifyUserAgent(uaString = '') {
  uaString = uaString.toLowerCase();

  let os = 'Unknown OS';
  if (uaString.includes('windows')) os = 'Windows';
  else if (uaString.includes('macintosh') || uaString.includes('mac os')) os = 'Mac OS';
  else if (uaString.includes('android')) {
    const match = uaString.match(/android\s+([\d.]+)/);
    os = match ? `Android ${match[1]}` : 'Android';
  } else if (uaString.includes('iphone') || uaString.includes('ipad')) os = 'iOS';

  let browser = 'Unknown Browser';
  if (uaString.includes('chrome')) browser = 'Chrome';
  else if (uaString.includes('safari') && !uaString.includes('chrome')) browser = 'Safari';
  else if (uaString.includes('firefox')) browser = 'Firefox';
  else if (uaString.includes('edg')) browser = 'Edge';

  return `${os} - ${browser}`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    let { response, ip_address, user_agent, city, region, country } = req.body;

    // Simplify UA
    let simplifiedUA = simplifyUserAgent(user_agent);

    // Detect spoofed UA: Android UA on Indian broadband
    if (simplifiedUA.toLowerCase().includes('android') && country === 'India') {
      simplifiedUA = 'Mac OS - Chrome (UA spoofed)';
    }

    const { error } = await supabase
      .from('responses')
      .insert([{ response, ip_address, user_agent: simplifiedUA, city, region, country }]);

    if (error) {
      console.error(error);
      return res.status(500).send("Database error");
    }

    return res.status(200).send("Response saved!");
  }

  res.status(405).end();
}
