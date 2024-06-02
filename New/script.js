document.addEventListener('DOMContentLoaded', function() {
    if (!isUserLoggedIn()) {
        document.getElementById('login-overlay').style.display = 'flex';
        document.querySelector('.chat-input textarea').disabled = true;
        document.querySelector('.chat-input span').style.pointerEvents = 'none';
    }
});
const chatbox = document.querySelector(".chatbox");
const chatInput = document.getElementById("user-input");
const sendChatBtn = document.querySelector(".chat-input span");
const chatTabs = document.querySelector(".chat-tabs");
const newChatBtn = document.getElementById("new-chat");
let userMessage = null;
let activeChat = null;
let chatHistory = [];
const API_KEY = "487d1a60a8msh9150d28133fd93ap1f9cb7jsn6a2414121850"; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("message", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<div class="logo-container"><img src="chatbot-chat-message-vectorart_78370-4104.jpg.avif" alt="Chatbot Logo"></div><div class="incoming-message-content"><p></p></div>`;
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

// Function to check if the user is logged in
function isUserLoggedIn() {
  const username = localStorage.getItem('username');
  const logoutLink = document.getElementById('logout-link');

  if (username) {
    // User is logged in
    logoutLink.style.display = 'block'; // Show the Logout button
    return true;
  } else {
    // User is not logged in
    logoutLink.style.display = 'none'; // Hide the Logout button
    return false;
  }
}

// Function to handle logout
function logout() {
  localStorage.removeItem('username');
  window.location.href = '../index.html'; // Redirect to the Home page
}

// Add an event listener to the logout link
document.querySelector('.right a').addEventListener('click', logout);

// Check if the user is logged in before displaying chat content
if (isUserLoggedIn()) {
  // Display chat content
  const initialMessage = "Welcome to Doubt Hut. Type your question...";
  createChatTab("Welcome");
  const incomingChatLi = createChatLi(initialMessage, "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
} else {
  // No sign-in/login prompt inside the chat-box
}