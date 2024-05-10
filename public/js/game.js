document.getElementById('submitReview').addEventListener('click', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value;
    const rapidId = window.location.pathname.split('/').pop(); // Now fetching rapid_id from URL

    // Fetch the actual game ID using the rapid_id
    fetch(`/api/games/find-by-rapid-id/${rapidId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(gameData => {
        const gameId = gameData.id; // Assuming the response contains the game id

        // Now post the review with the actual game ID
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
            location.reload(); // Optionally reload the page to show the new review.
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    .catch((error) => {
        console.error('Error fetching game ID:', error);
    });
});





// document.getElementById('submitReview').addEventListener('click', function(event) {
//     event.preventDefault();
//     const reviewText = document.getElementById('reviewText').value;
//     const gameId = window.location.pathname.split('/').pop(); // Assuming URL like /games/:id
    
    

//     fetch('/api/reviews', {
//         method: 'POST',
//         body: JSON.stringify({
//             description: reviewText,
//             game_id: gameId
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         //location.reload(); // Reload the page to show the new review.
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });
