document.addEventListener('DOMContentLoaded', () => {
    const addFriendBtn = document.getElementById('add-friend-btn');
    const friendInput = document.getElementById('friend-input');

    addFriendBtn.addEventListener('click', async () => {
        const friendName = friendInput.value.trim();

        if (friendName) {
            try {
                const response = await fetch(`/api/users/find-by-name`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: friendName })
                });

                if (response.ok) {
                    const friendData = await response.json();

                    const updateResponse = await fetch(`/api/users/add-friend`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ friendId: friendData.id })
                    });

                    if (updateResponse.ok) {
                        alert('Friend added successfully!');
                        location.reload(); 
                    } else {
                        const errorMessage = await updateResponse.text();
                        alert(errorMessage);
                    }
                } else {
                    alert('Friend not found');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while adding the friend');
            }
        } else {
            alert('Please enter a username');
        }
    });
});
