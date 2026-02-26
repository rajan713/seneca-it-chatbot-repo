const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let conversationHistory = {};

app.post('/chat', async (req, res) => {
    const { message, user } = req.body;

    if (!conversationHistory[user]) {
        conversationHistory[user] = [];
    }

    conversationHistory[user].push(message);

    let response = "";

    // Simple intent detection
    if (message.toLowerCase().includes("hello")) {
        response = "Hello! How can I help you today?";
    } 
    else if (message.toLowerCase().includes("bye")) {
        response = "Goodbye! Have a great day.";
    }
    else {
        response = "I received: " + message;
    }

    conversationHistory[user].push(response);

    res.json({ reply: response });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
