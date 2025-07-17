// ✅ YES button logic
document.getElementById('yesButton').addEventListener('click', function () {
  alert("Tere saath har lamha khushbu ban jaaye😍, Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊, Main khush hoon kyunki tu mere paas hamesha rahe❤️.");

  fetch('https://loveform-api.riya.repl.co/save_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ response: 'yes' })
  })
  .then(res => res.text())
  .then(data => console.log("✅ Server response:", data))
  .catch(err => console.error("❌ Error sending yes:", err));
});

// ❌ NO button logic
document.getElementById('noButton').addEventListener('click', function () {
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);
  this.style.position = 'absolute';
  this.style.left = `${randomX}px`;
  this.style.top = `${randomY}px`;

  fetch('https://loveform-api.riya.repl.co/save_response', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ response: 'no' })
  })
  .then(res => res.text())
  .then(data => console.log("✅ Server response:", data))
  .catch(err => console.error("❌ Error sending no:", err));
});
