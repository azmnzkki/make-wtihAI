var question = document.getElementById("question");
var answer = document.getElementById("answer");
var chatHistoryContainer = document.getElementById("chat-history");
var chatContainer = document.getElementById("chat-container");
var loading = document.getElementById("loading"); 
var apiUrl = `https://widipe.com/openai`;


var chatHistory = [];

async function sendReq() {
  try {
    const userQuestion = question.value; 
    if (!userQuestion) return; 

    
    chatHistory.push({ user: userQuestion, bot: "" });
    updateChatBox();

    
    loading.style.display = "flex"; 

    const url = `${apiUrl}?text=${userQuestion}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.result; 

   
    chatHistory[chatHistory.length - 1].bot = botResponse;
    updateChatBox();
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.style.display = "none";
  }
}


function updateChatBox() {
  answer.innerHTML = ""; 
  chatHistory.forEach((chat) => {
    answer.innerHTML += `<div><strong>User:</strong> ${chat.user}</div>`;
    answer.innerHTML += `<div><strong>Bot:</strong> ${chat.bot}</div>`;
  });
}


function showChatHistory() {
  chatContainer.style.display = "none"; 
  chatHistoryContainer.style.display = "block"; 
  chatHistoryContainer.innerHTML = ""; 

  chatHistory.forEach((chat) => {
    chatHistoryContainer.innerHTML += `<div><strong>User:</strong> ${chat.user}</div>`;
    chatHistoryContainer.innerHTML += `<div><strong>Bot:</strong> ${chat.bot}</div>`;
  });
}


function showMainChat() {
  chatContainer.style.display = "block";
  chatHistoryContainer.style.display = "none";
}
