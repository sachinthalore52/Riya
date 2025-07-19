async function getLocationData() {
  try {
    // Primary API
    const res1 = await fetch('https://ipapi.co/json/');
    if (res1.ok) return await res1.json();

    // Backup API
    const res2 = await fetch('https://ipwho.is/');
    if (res2.ok) {
      const data = await res2.json();
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country_name: data.country
      };
    }
  } catch (err) {
    console.warn('Location fetch failed:', err.message);
  }
  return {}; // fallback empty object
}

async function sendResponse(answer) {
  try {
    const locData = await getLocationData();
    console.log('Location Data:', locData);

    const payload = {
      response: answer,
      ip_address: locData.ip || 'unknown',
      user_agent: navigator.userAgent || 'unknown',
      platform: navigator.platform || 'unknown',  // Added platform info
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

document.getElementById('yesButton').addEventListener('click', function () {
  alert('Tere saath har lamha khushbu ban jaaye😍, Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊, Main khush hoon kyunki tu mere paas hamesha rahe❤️.');
  sendResponse('yes');
});

document.getElementById('noButton').addEventListener('click', function () {
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);

  this.style.position = 'absolute';
  this.style.left = `${randomX}px`;
  this.style.top = `${randomY}px`;

  sendResponse('no');
});
