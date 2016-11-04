/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        var database = firebase.database();

        var messages = database.ref("channnels/general");

        messages.on("child_added", function(data) {
            var id = data.key;
            var message = data.val();

            var text = message.text;
            var timestamp = message.timestamp;

            var messageLi = document.createElement("li");
            messageLi.id = id;
            messageLi.innerText = text;

            messagesList.appendChild(messageLi);
        });

        messages.on("child_changed", function(data) {
            var id = data.key;
            var message = data.val();

            console.log(message.text);
        });

        messages.on("child_removed", function(data) {
            var id = data.key;

            console.log(id);
        })
    }else {
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var database = firebase.database();
    var messages = database.ref("channels/general");

    var message = messageInput.value;

    messages.push({
        text: message,
        timestamp: new Date().getTime()
    })
    .then(function() {

    })
    .catch(function(error) {

    });
});