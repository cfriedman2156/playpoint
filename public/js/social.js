document.addEventListener("DOMContentLoaded", function() {
    function addFriend() {
        const friendInput = document.getElementById("friend-input");
        const friendName = friendInput.value.trim();

        if (!friendName) {
            alert('Please enter a valid username.');
            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.open("POST", "/add-friend");

        xhr.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({ friendName: friendName });

        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                alert(response.message); 
            } else {
                alert('Error adding friend: ' + xhr.statusText);
            }
        };

        xhr.onerror = function() {
            alert('Network error occurred while adding friend.');
        };

        xhr.send(data);
    }

    const addFriendBtn = document.getElementById("add-friend-btn");

    addFriendBtn.addEventListener("click", function(event) {
        event.preventDefault(); 
        addFriend();
    });
});
