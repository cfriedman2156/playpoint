document.getElementById('submitReview').addEventListener('click', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value;
    const gameId = window.location.pathname.split('/').pop(); // Assuming URL like /games/:id

    fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
            description: reviewText,
            game_id: gameId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.reload(); // Reload the page to show the new review.
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
