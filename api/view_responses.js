import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://comdfcrvqifcbtntdofs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbWRmY3J2cWlmY2J0bnRkb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NDc1MzAsImV4cCI6MjA2ODUyMzUzMH0.usg1Sp-yMteILv5qwgEd6hsvrZ10TVe42_9-z7tKJaU';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) return res.status(500).send("Error fetching data");

  res.status(200).json(data);
}
