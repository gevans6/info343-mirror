/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to edit and delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */
var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        if(user.emailVerified) {
            var database = firebase.database();

            var messages = database.ref("channels/general");

        

            messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            
            var timestamp = message.timestamp;
            //var displayName = message.displayName;
            //var photoURL = message.photoURL;

            var img = document.createElement("img");
            img.src = message.photoURL;

            var nameHeader = document.createElement("h4");
            nameHeader.innerText = message.displayName;

            var messageContent = document.createElement("p");
            messageContent.innerText = message.text;

            var messageLi = document.createElement("li");
            
            messageLi.id = id;
            messageLi.className = "list-group-item";
            messageLi.appendChild(nameHeader);
            messageLi.appendChild(messageContent);    
            messageLi.appendChild(img);
            
            
            //messageLi.className = "";

            
            
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
            });
        }else {
            console.log("email not verified");
        }
        
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
    var user = firebase.auth().currentUser;

    var message = messageInput.value;

    messages.push({
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: message,
        timestamp: new Date().getTime()
    })
    .then(function() {
        document.getElementById("message-input").value = "";
    })
    .catch(function(error) {

    });
});


