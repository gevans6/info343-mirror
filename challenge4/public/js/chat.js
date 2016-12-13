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
var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");
var messageSubmitButton = document.getElementById("submit");
var textError = document.getElementById("post-error");
var verifiedBoolean; //boolean to keep track of verification status

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        // Restrict priveledges if user is not verified
        if(!user.emailVerified){ 
            messageInput.disabled = true;
            messageInput.placeholder = "Verify your email address in order to post, edit, or delete messages."
            messageSubmitButton.classList.add("disabled");
            verifiedBoolean = false;
        }else {
            verifiedBoolean = true;
        }
        
            var database = firebase.database();
            var messages = database.ref("channels/general");

            messages.on('child_added', function(data) {
                var id = data.key;
                var message = data.val();
                var timestamp = message.timestamp;

                // Create the complete message
                var img = document.createElement("img");
                img.src = message.photoURL;

                var nameHeader = document.createElement("h4");
                nameHeader.innerText = message.displayName;

                var messageContent = document.createElement("p");
                messageContent.id = (id +"post");
                messageContent.innerText = message.text;

                var dateAndTime = document.createElement("span");
                dateAndTime.id = (id + "human-timestamp");
                dateAndTime.innerText = moment(timestamp).format("MMMM Do YYYY, h:mm:ss a");
                
                var editButton = document.createElement("button");
                editButton.id = "edit-button";
                editButton.className = "btn btn-link";
                editButton.innerText = "Edit";
                editButton.type = "click";
                
                var removeButton = document.createElement("button");
                removeButton.id = "remove-button";
                removeButton.className = "btn btn-link";
                removeButton.innerText = "Delete";
                
                var editTextArea = document.createElement("textarea");
                editTextArea.id = "edit-box";
                editTextArea.rows = "2";
                editTextArea.innerText = messageContent.innerText;
                editTextArea.classList.add("hide");

                var editConfirmButton = document.createElement("button");
                editConfirmButton.id = "edit-confirm";
                editConfirmButton.className = "btn btn-primary";
                editConfirmButton.innerText = "Confirm Edit";
                editConfirmButton.type = "click";
                editConfirmButton.classList.add("hide");

                var editCancelButton = document.createElement("button");
                editCancelButton.id = "edit-cancel";
                editCancelButton.className = "btn btn-default";
                editCancelButton.innerText = "Cancel";
                editCancelButton.classList.add("hide");
                
                var messageLi = document.createElement("li");
                
                messageLi.id = id;
                messageLi.className = "list-group-item";
                messageLi.appendChild(img);
                messageLi.appendChild(nameHeader);
                messageLi.appendChild(messageContent);
                messageLi.appendChild(dateAndTime);
                
                // Restrict edit/delete functions to the current user
                if(user.uid === message.uid){
                    messageLi.appendChild(editButton);
                    messageLi.appendChild(removeButton);
                    messageLi.appendChild(editTextArea);
                    messageLi.appendChild(editConfirmButton);
                    messageLi.appendChild(editCancelButton);

                }
                
                // Toggle edit area with edit button
                editButton.addEventListener("click", function(e) {
                    editTextArea.value = document.getElementById(id + "post").textContent;
                    editTextArea.classList.toggle("hide");
                    editConfirmButton.classList.toggle("hide");
                    editCancelButton.classList.toggle("hide");
                    messageContent.classList.toggle("hide");
                });

                // Enact change in firebase database and toggle edit fucntions
                editConfirmButton.addEventListener("click", function(e) {
                    node = database.ref("channels/general/" + id);
                    node.set({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        text: editTextArea.value,
                        timestamp: new Date().getTime()
                    });

                    editTextArea.value = document.getElementById(id + "post").textContent;
                    editTextArea.classList.toggle("hide");
                    editConfirmButton.classList.toggle("hide");
                    editCancelButton.classList.toggle("hide");
                    messageContent.classList.toggle("hide");
                });

                // Toggle edit area with a cancel button
                editCancelButton.addEventListener("click", function(e) {
                    editTextArea.classList.toggle("hide");
                    editConfirmButton.classList.toggle("hide");
                    editCancelButton.classList.toggle("hide");
                    messageContent.classList.toggle("hide");
                });

                // Remove button function and confirmation message
                removeButton.addEventListener("click", function(e) {
                    if (confirm("Are you sure you want to delete this message?") == true){
                        node = database.ref("channels/general/" + id);
                        node.remove();
                    }   
                });

                messagesList.appendChild(messageLi);
            });

            // Change the DOM when firebase is changed
            messages.on("child_changed", function(data) {
                var id = data.key;
                var message = data.val();
                var timestamp = message.timestamp;

                document.getElementById(id + "post").innerHTML = message.text;    
                document.getElementById(id + "human-timestamp").innerHTML = moment(timestamp).format("MMMM Do YYYY, h:mm:ss a");
            });

            // Change the DOM when firebase is changed
            messages.on("child_removed", function(data) {
                var id = data.key;

                var removeNode = document.getElementById(id);
                removeNode.parentNode.removeChild(removeNode);
            });
    }else {
        window.location.href = "index.html";
    }
});

messageForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Restrict posting messages to verified users
    if(verifiedBoolean) {
        var database = firebase.database();
        var messages = database.ref("channels/general");
        var user = firebase.auth().currentUser;

        var message = messageInput.value;

        messages.push({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: message,
            timestamp: new Date().getTime()
        })
        .then(function() {
            document.getElementById("message-input").value = "";
        })
        .catch(function(error) {
            textError.innerText = "Error sending your message";
            textError.classList.add("active");
        });
    }        
});
