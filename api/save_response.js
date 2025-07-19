import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://comdfcrvqifcbtntdofs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbWRmY3J2cWlmY2J0bnRkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDc1MzAsImV4cCI6MjA2ODUyMzUzMH0.usg1Sp-yMteILv5qwgEd6hsvrZ10TVe42_9-z7tKJaU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { response, ip_address, user_agent, city, region, country } = req.body;

    const { error } = await supabase
      .from('responses')
      .insert([{ response, ip_address, user_agent, city, region, country }]);

    if (error) {
      console.error(error);
      return res.status(500).send("Database error");
    }

    return res.status(200).send("Response saved!");
  }

  res.status(405).end();
}
