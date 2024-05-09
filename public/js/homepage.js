document.addEventListener("DOMContentLoaded", function() {
    function searchGame() {
        const searchInput = document.querySelector("#search-input").value.trim();

        if (!searchInput) {
            alert('Please enter a search query.');
            return;
        }

        fetch(`api/users/search/${encodeURIComponent(searchInput)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    const gameUrl = '/game/' + encodeURIComponent(data[0].id);
                    console.log(data);
                    window.location.href = gameUrl;
                } else {
                    alert('No game found with that name.');
                }
            })
            .catch(error => {
                console.error('Failed to fetch game:', error);
                alert('Failed to search for the game. Please try again.');
            });
    }

    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        searchGame();
    });

    const gameCards = document.querySelectorAll('.games .card');

    gameCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const gameName = card.querySelector('.card-title').textContent; 

            const gameUrl = '/games/' + encodeURIComponent(gameName); 
            window.location.href = gameUrl; 
        });
    });
});
