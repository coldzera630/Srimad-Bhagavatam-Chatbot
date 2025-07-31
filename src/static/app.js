// src/static/app.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const initialView = document.querySelector('.initial-view'); 

let loadingMessageElement = null;
let chatHasMessages = false;

function addMessage(text, sender) {
  if (!chatHasMessages && initialView) {
      initialView.style.display = 'none';
      chatBox.classList.add('has-messages'); 
      chatHasMessages = true;
      const initialBotMsg = document.querySelector('.initial-bot-message');
      if (initialBotMsg) {
      }
  }

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
  const paragraph = document.createElement('p');
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');     
  paragraph.innerHTML = text; 
  

  messageDiv.appendChild(paragraph);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; 
  return messageDiv;
}

function showLoadingMessage() {
    if (!chatHasMessages && initialView) {
        initialView.style.display = 'none';
        chatBox.classList.add('has-messages');
        chatHasMessages = true;
    }

    loadingMessageElement = document.createElement('div');
    loadingMessageElement.className = 'loading-message'; 

    
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'loading-dots';

    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    }

    loadingMessageElement.appendChild(dotsContainer);
    chatBox.appendChild(loadingMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    return loadingMessageElement;
}

function removeLoadingMessage() {
    if (loadingMessageElement && loadingMessageElement.parentNode) {
        loadingMessageElement.parentNode.removeChild(loadingMessageElement);
        loadingMessageElement = null;
    }
}

async function sendMessage() {
    const question = userInput.value.trim();
    if (!question) return; 

    addMessage(question, 'user');
    userInput.value = ''; 

    showLoadingMessage();

    sendButton.disabled = true; 
    userInput.disabled = true; 

    try {
        const response = await fetch('/query', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }),
        });

        removeLoadingMessage();

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
            console.error('API Error:', response.status, errorData);
            addMessage(`Error: ${errorData.error || 'Could not reach the server.'}`, 'bot');
        } else {
            const data = await response.json();
            addMessage(data.answer, 'bot');
        }
    } catch (error) {
        removeLoadingMessage();
        console.error('Network or other error:', error);
        addMessage('Error: Could not connect to the chatbot API. Please check your connection or the server.', 'bot');
    } finally {
        sendButton.disabled = false; 
        userInput.disabled = false; 
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 
        sendMessage();
    }
});

const examplePrompts = document.querySelectorAll('.capability-column.selectable ul li');
examplePrompts.forEach(prompt => {
    prompt.addEventListener('click', () => {
        const promptText = prompt.textContent.replace(' →', '').trim();
        userInput.value = promptText;
        userInput.focus();
    });
});

userInput.focus();