document.addEventListener("DOMContentLoaded", function() {
    function searchGame() {
        const searchInput = document.getElementById("search-input").value.trim();

        if (!searchInput) {
            alert('Please enter a search query.');
            return;
        }

        // make an AJAX request to search for the game and update the UI accordingly
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
