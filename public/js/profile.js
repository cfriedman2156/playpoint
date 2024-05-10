document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-review')) {
            e.preventDefault();
            const reviewId = e.target.getAttribute('data-id');
            console.log('Review ID:', reviewId);  // Check if ID is captured correctly
            
            if (!reviewId) {
                console.error('No review ID found, cannot delete.');
                return; // Stop the function if no ID is found
            }

            fetch(`api/reviews/${reviewId}`, {
                method: 'DELETE',
            })
            .then(response => {
                console.log('Response status:', response.status); // Check response status
                return response.json();
            })
            .then(data => {
                console.log('Delete response:', data);  // Log the response data
                location.reload();  // Reload the page to reflect changes
            })
            .catch(err => console.error('Error deleting review:', err));
        }
    });
});
