document.getElementById('submitReview').addEventListener('click', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value;
    const rapidId = window.location.pathname.split('/').pop(); 

    // get game_id thru rapid_id
    fetch(`/api/games/find-by-rapid-id/${rapidId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(gameData => {
        const gameId = gameData.id;

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
            location.reload(); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    .catch((error) => {
        console.error('Error fetching game ID:', error);
    });
});
