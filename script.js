// ✅ Yes button click
document.getElementById('yesButton').addEventListener('click', function () {
    alert('Tere saath har lamha khushbu ban jaaye😍, Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊, Main khush hoon kyunki tu mere paas hamesha rahe❤️.');

    fetch('https://forriya.infinityfreeapp.com/save_response.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: 'yes' })
    })
    .then(res => res.text())
    .then(data => console.log("✅ Server response:", data))
    .catch(err => console.error("❌ Error:", err));
});

// ❌ No button click
document.getElementById('noButton').addEventListener('click', function () {
    // Move button to random location
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);

    this.style.position = 'absolute';
    this.style.left = `${randomX}px`;
    this.style.top = `${randomY}px`;

    // Save 'no' response
    fetch('https://forriya.infinityfreeapp.com/save_response.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: 'no' })
    })
    .then(res => res.text())
    .then(data => console.log("✅ Server response:", data))
    .catch(err => console.error("❌ Error:", err));
});
