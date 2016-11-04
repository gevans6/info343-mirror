/*
 * This file should contain code for the following tasks:
 * 1. Create a new account.
 * 2. Sign in an existing account.
 * 3. Redirect a user to chat.html once they are logged in/signed up.
 */

var signupForm = document.getElementById("signup-form");
var signupName = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");
var signupPasswordConfirm = document.getElementById("signup-password-confirm");
var signupError = document.getElementById("signup-error");

signupForm.addEventListener("submit", function(e) {
    e.preventDefault();

    signupError.classList.remove("active");

    var displayName = signupName.value;
    var email = signupEmail.value;
    var password = signupPassword.value;
    var passwordConfirm = signupPasswordConfirm.value;

    console.log(displayName);
    console.log(email);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm){
        signupError.textContent = "Passwords do not match";
        signupError.classList.add("active");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            console.log(user);

            // Send verification email

            // Update their display name and profile picture
            // displayName, photoURL

            // Redirect to  chat page
            window.location.href = "chat.html";
        })
        .catch(function(error) {
            signupError.textContent = error.message;
            signupError.classList.add("active");
        });
    }
});

var loginForm = document.getElementById("login-form");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginButton = document.getElementById("login-button");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var email = loginEmail.value;
    var password = loginPassword.value;

    console.log(email);
    console.log(password);

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function() {
        console.log("Logged in successfully");
        
        window.location.href = "chat.html"
    })
    .catch(function(error) {
        console.log(error.message);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user){
        console.log("signed in");

        var database = firebase.database();

        var testRef = database.ref("test");
        testRef.on("value", function(snapshot){
            var val = snapshot.val();

            console.log(val);
        });

        database.ref("mainchat").set("Hello all");
    }else {
        console.log("signed out");
    }
});