// YES Button
document.getElementById('yesButton').addEventListener('click', function () {
    alert('Tere saath har lamha khushbu ban jaaye😍, Dil mera bas tera geet hi gungunaaye🥰. Teri muskaan mein meri duniya base😊, Main khush hoon kyunki tu mere paas hamesha rahe❤️.');

    sendResponse('Yes');
});

// NO Button
document.getElementById('noButton').addEventListener('click', function () {
    const container = document.querySelector('.container');

    const randomX = Math.random() * (window.innerWidth - 100); // 100 is button width
    const randomY = Math.random() * (window.innerHeight - 100); // 100 is button height

    this.style.position = 'absolute';
    this.style.left = `${randomX}px`;
    this.style.top = `${randomY}px`;

    sendResponse('No');
});

// ✅ Function to send response to backend
function sendResponse(answer) {
    fetch('https://forriya-backend.000webhostapp.com/save_response.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'answer=' + encodeURIComponent(answer)
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server response:", data);
    })
    .catch(error => {
        console.error("Error sending response:", error);
    });
}
