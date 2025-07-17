// ✅ YES button
document.getElementById('yesButton').addEventListener('click', function () {
  alert("Tere saath har lamha khushbu ban jaaye😍, Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊, Main khush hoon kyunki tu mere paas hamesha rahe❤️.");

  const formData = new URLSearchParams();
  formData.append('response', 'yes');

  fetch('https://forriya.infinityfreeapp.com/save_response.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(res => res.text())
  .then(data => console.log("✅ Server response:", data))
  .catch(err => console.error("❌ Error:", err));
});

// ❌ NO button
document.getElementById('noButton').addEventListener('click', function () {
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);
  this.style.position = 'absolute';
  this.style.left = `${randomX}px`;
  this.style.top = `${randomY}px`;

  const formData = new URLSearchParams();
  formData.append('response', 'no');

  fetch('https://forriya.infinityfreeapp.com/save_response.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData.toString()
  })
  .then(res => res.text())
  .then(data => console.log("✅ Server response:", data))
  .catch(err => console.error("❌ Error:", err));
});
