document.getElementById('yesButton').addEventListener('click', function() {
    alert('Tere saath har lamha khushbu ban jaaye😍,                                       Dil mera bas tera geet hi gungunaaye🥰 .                                         Teri muskaan mein meri duniya base😊,                                          Main khush hoon kyunki tu mere paas hamesha rahe.❤️ ');
});

document.getElementById('noButton').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Get random position for the "No" button
    const randomX = Math.random() * (window.innerWidth - 100); // 100 is the button width
    const randomY = Math.random() * (window.innerHeight - 100); // 100 is the button height

    // Set the new position
    this.style.position = 'absolute';
    this.style.left = `${randomX}px`;
    this.style.top = `${randomY}px`;
});