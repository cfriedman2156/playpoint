document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-review')) {
            e.preventDefault();
            const reviewId = e.target.getAttribute('data-id');
            console.log('Review ID:', reviewId);  
            
            if (!reviewId) {
                console.error('No review ID found, cannot delete.');
                return; 
            }

            fetch(`api/reviews/${reviewId}`, {
                method: 'DELETE',
            })
            .then(response => {
                console.log('Response status:', response.status); 
                return response.json();
            })
            .then(data => {
                console.log('Delete response:', data);  
                location.reload();  
            })
            .catch(err => console.error('Error deleting review:', err));
        }
    });
});

function showModal(reviewId, currentText) {
    const modal = document.getElementById(`modal_${reviewId}`);
    const textarea = document.getElementById(`reviewText_${reviewId}`);
    textarea.value = currentText;  
    modal.showModal();  
}

function submitReviewUpdate(reviewId) {
    const updatedText = document.getElementById(`reviewText_${reviewId}`).value;
    const url = `/api/reviews/${reviewId}`;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedText })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error, status = ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log('Update response:', data); 
        location.reload();
    })
    .catch(err => console.error('Error updating review:', err)); 
}

