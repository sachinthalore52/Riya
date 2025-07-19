// Function: Collect user details and send to backend
async function sendResponse(answer) {
  try {
    // Fetch user's IP and location data
    const locData = await fetch('https://ipapi.co/json/').then(res => res.json());

    const payload = {
      response: answer,
      ip_address: locData.ip || 'unknown',
      user_agent: navigator.userAgent || 'unknown',
      city: locData.city || '',
      region: locData.region || '',
      country: locData.country_name || ''
    };

    const res = await fetch('https://riya-zeta.vercel.app/api/save_response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log(`✅ Server response: ${text}`);
  } catch (err) {
    console.error('❌ Error sending response:', err);
  }
}

// Yes button click handler
document.getElementById('yesButton').addEventListener('click', function () {
  alert('Tere saath har lamha khushbu ban jaaye😍,Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊,Main khush hoon kyunki tu mere paas hamesha rahe❤️.');
  sendResponse('yes');
});

// No button click handler (moves around randomly)
document.getElementById('noButton').addEventListener('click', function () {
  const container = document.querySelector('.container');
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);

  this.style.position = 'absolute';
  this.style.left = `${randomX}px`;
  this.style.top = `${randomY}px`;

  sendResponse('no');
});
