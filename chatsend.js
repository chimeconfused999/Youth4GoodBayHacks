import { db } from './firebase.js';
import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

async function chatsend() {
  var chatbox = document.getElementById("chatbox");

  // Check if the message is NOT an AI chatbot request
  if (!chatbox.value.includes("@gpt") && chatbox.value.trim() !== "" && chatbox.value.trim().length <= 1500) {

    // Regular chat message logic using Firestore
    const chatRef = collection(db, "chats");

    // Save the message to Firestore
    addDoc(chatRef, {
      username: localStorage.getItem("name"),
      chatroom: localStorage.getItem("curchat"),
      message: chatbox.value.trim(),
      timestamp: new Date()
    })
    .then(() => {
      console.log("Message sent successfully to Firestore.");
      chatbox.value = ""; // Clear chatbox after sending
    })
    .catch(error => {
      console.error("Error sending message to Firestore: ", error);
    });

  } else if (chatbox.value.includes("@gpt")) {
    // Logic to handle AI chatbot request using the existing AJAX setup
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "chat.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Disable the input field before sending the request
    chatbox.disabled = true;

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Re-enable the input field after the response is received
        chatbox.disabled = false;
        chatbox.value = ""; // Clear the chatbox
      }
    };

    const curChat = encodeURIComponent(localStorage.getItem("curchat"));
    const name = encodeURIComponent(localStorage.getItem("name"));
    const chatboxValue = encodeURIComponent(chatbox.value.trim());

    // Create the data string with newlines encoded as %0A
    const data = `username=${curChat}%0A${name} %0A${chatboxValue}`;
    xhr.send(data);
  } else if (chatbox.value.trim().length > 1500) {
    chatbox.value = "Message too long";
  }
}
export { chatsend };
