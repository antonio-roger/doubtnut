
/*************************************CHAT-BOT***********************************************/

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
var navLinks = document.getElementById("navLinks");


let userMessage = null; // Variable to store user's message
const API_KEY = "487d1a60a8msh9150d28133fd93ap1f9cb7jsn6a2414121850"; //API key
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com"
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }],
            model: "gpt-4-turbo-preview",
            max_tokens: 200,
            temperature: 0.9
        })
    }

    // Send POST request to API, get response and set the response as paragraph text
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace

        setTimeout(showPopup, 0); // Show popup after 10 seconds (10000 milliseconds

    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});


sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
/***********************************************************************************************/


// collsb --->>>>scroll
document.addEventListener("DOMContentLoaded", function() {
    const slideTrack = document.querySelector('.slide-track');
    const slideItems = Array.from(document.querySelectorAll('.slideimg'));

    // Clone all items and append them to the slide track
    for (let n = 0; n < 30; n++) {
        slideItems.forEach(item => {
            let clone = item.cloneNode(true);
            slideTrack.appendChild(clone);
        });
    }
});

//Personalised Hi msg....
  document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");
    const greetingMessage = document.getElementById("greetingMessage");
    const popupOverlay = document.getElementById("popup-overlay");
  
    if (username) {
      greetingMessage.textContent = `Hi User Welcome back, how can I help you today?`;
      if (popupOverlay) {
        popupOverlay.style.display = "none"; // Hide the popup if user is logged in
      }
    } else {
      greetingMessage.textContent = "Hi Guest, Login to continue";
  
      // Dynamically display popup content if username doesn't exist
      if (popupOverlay) {
        popupOverlay.innerHTML = `
          <div class="popup-content">
            <h2>Welcome to Doubt Hut</h2>
            <p>Please sign in or log in to continue using our services.</p>
            <a href="login.html" class="sign-in-link">Sign In</a>
          </div>
        `;
        popupOverlay.style.display = "flex"; // Ensure the popup is visible
      }
    }
  });


 // in chatbot sigin prompt
function showPopup() {
  var popupOverlay = document.getElementById("popup-overlay");
  popupOverlay.style.display = "block";
}

  
    // Function to clear localStorage and reload page on logout
    function logout(){
      localStorage.removeItem("username"); // Clear username from localStorage
      window.location.href = "index.html"
      localStorage.removeItem("username"); // Clear username from localStorage
        alert("Logged out successfully!");
      firebase.auth().signOut().then(() => {
        console("logged out in firebase")
      }).catch((error) => {
        alert("Error logging out. Please try again.");
      });
    };
  //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
  
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
  

// Get the profile name, login link, and logout link elements
const profileName = document.getElementById('profile-name');
const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
// Function to display the username and show/hide the login and logout links
function updateProfileDisplay(username) {
  if (username) {
    profileName.textContent = "Welcome User";
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
  } else {
    profileName.textContent = 'Profile';
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
  }
}
// Function to handle logout
function logout() {
  // Remove the username from local storage
  localStorage.removeItem('username');
  // Update the profile display
  updateProfileDisplay(null);
  // Redirect to the login page
  window.location.href = 'login.html';
}
// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
  const username = localStorage.getItem('username');
  updateProfileDisplay(username);
});
// Add click event listener to the logout link
logoutLink.addEventListener('click', logout);

