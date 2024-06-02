const chatbox = document.querySelector(".chatbox");
const chatInput = document.getElementById("user-input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatTabs = document.querySelector(".chat-tabs");
const newChatBtn = document.getElementById("new-chat");
let userMessage = null;
let activeChat = null;
let chatHistory = [];
const API_KEY = "8f344fc6cdmshd76b3e7c61e7dd2p1ec063jsnb7c20e582d21"; // Your provided RapidAPI key
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("message", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<div class="logo-container"><image src="chatbot-chat-message-vectorart_78370-4104.jpg.avif" fit centered></video><span class="material-symbols-outlined">Doubt Hut</span></div><div class="incoming-message-content"><p></p></div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) => {
    const API_URL = "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
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
            max_tokens: 2000,
            temperature: 0.9
        })
    }
    fetch(API_URL, requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const response = data.choices[0].message.content.trim();
            messageElement.textContent = response;
            addMessageToHistory(response, "incoming");
            chatbox.scrollTo(0, chatbox.scrollHeight);
        })
        .catch(error => {
            console.error("API request error:", error);
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
            chatbox.scrollTo(0, chatbox.scrollHeight);
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    setTimeout(showPopup, 0); 

    const previousOutgoingLogos = chatbox.querySelectorAll(".message.outgoing .logo-container");
    previousOutgoingLogos.forEach(logo => {
        logo.parentNode.removeChild(logo);
    });
    const outgoingMessage = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingMessage);
    addMessageToHistory(userMessage, "outgoing");
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

function createChatTab(chatName = "New Chat") {
    const chatTab = document.createElement("li");
    chatTab.classList.add("chat-tab");
    chatTab.textContent = chatName;
    chatTab.addEventListener("click", () => {
        activateChat(chatTab);
    });
    chatTabs.appendChild(chatTab);
    activateChat(chatTab);
}

function activateChat(chatTab) {
    const activeChatTab = document.querySelector(".chat-tab.active");
    if (activeChatTab) {
        activeChatTab.classList.remove("active");
    }
    chatTab.classList.add("active");
    activeChat = chatTab;
    chatbox.innerHTML = "";
    const chatHistory = getChatHistory(chatTab);
    chatHistory.forEach(message => {
        const li = createChatLi(message.content, message.type);
        chatbox.appendChild(li);
    });
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

function getChatHistory(chatTab) {
    const chatIndex = Array.from(chatTabs.children).indexOf(chatTab);
    return chatHistory[chatIndex] || [];
}

function addMessageToHistory(message, type) {
    const chatIndex = Array.from(chatTabs.children).indexOf(activeChat);
    if (!chatHistory[chatIndex]) {
        chatHistory[chatIndex] = [];
    }
    chatHistory[chatIndex].push({ content: message, type });
}

newChatBtn.addEventListener("click", () => {
    const chatName = prompt("Enter a name for the new chat:");
    if (chatName) {
        createChatTab(chatName);
    }
});

const initialMessage = "Welcome to Doubt Hut..... Type your question...";
createChatTab("Welcome");
const incomingChatLi = createChatLi(initialMessage, "incoming");
chatbox.appendChild(incomingChatLi);
chatbox.scrollTo(0, chatbox.scrollHeight);


// TOOGLE
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.right === "0px") {
        navLinks.style.right = "-200px";
    } else {
        navLinks.style.right = "0px";
    }
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.right === "0px") {
        navLinks.style.right = "-200px";
    } else {
        navLinks.style.right = "0px";
    }
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

      //Personalised Hi msg....
  document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem("username");
    
    const popupOverlay = document.getElementById("popup-overlay");
  
    if (username) {
     
      if (popupOverlay) {
        popupOverlay.style.display = "none"; // Hide the popup if user is logged in
      }
    } else {
     
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
