// // Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyCnAF6Twp21IgeJJK7enqK04kqUJiDNsP0",
//   authDomain: "login-cedca.firebaseapp.com",
//   databaseURL: "https://login-cedca-default-rtdb.firebaseio.com",
//   projectId: "login-cedca",
//   storageBucket: "login-cedca.appspot.com",
//   messagingSenderId: "153936128820",
//   appId: "1:153936128820:web:2d415f3d72db7888151361",
//   measurementId: "G-KSV9KPMRZF"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var database = firebase.database();
// const auth = firebase.auth();

// Sign up function
document.getElementById('signupbtn').addEventListener('click', (e) => {
  e.preventDefault();

  var email = document.getElementById('email').value;
  var fullname = document.getElementById('name').value;
  var username = document.getElementById('usrname').value;
  var password = document.getElementById('password').value;

//   auth.createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       return firebase.database().ref('users/' + user.uid).set({
//         fullname: fullname,
//         username: username,
//         email: email
//       }).then(() => {
//         alert('User created successfully! Login to continue');
//         window.location.href = "login.html";
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });

// // Login function

// document.getElementById('loginbtn').addEventListener('click', (e) => {
//   e.preventDefault();

//   var email = document.getElementById('eimp').value;
//   var password = document.getElementById('pimp').value;

//   auth.signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const dt = new Date();

//       // Update last login time in the database
//       firebase.database().ref('users/' + user.uid).update({
//         last_login: dt
//       }).then(() => {
//         // Fetch username from the database
//         return firebase.database().ref('users/' + user.uid).once('value');
//       }).then((snapshot) => {
//         const username = snapshot.val().username;
        
//         // Store username in local storage
//         localStorage.setItem("username", username);
        
//         // Redirect to index.html
//         window.location.href = "index.html";
        
//         // Alert user logged in
//         alert('User Logged in!');
//       }).catch((updateError) => {
//         console.error("Database Update Error:", updateError);
//         alert("Error updating user data. Please try again later.");
//       });
//     })
//     .catch((error) => {
//       console.error("Authentication Error:", error);
//       alert(error.message);
//     });
// });

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Error logging out. Please try again.");
  });
}

function signupForm() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

function loginForm() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
}

// from html
