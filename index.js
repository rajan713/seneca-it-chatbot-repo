const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory conversation history
let conversationHistory = {};

app.post('/chat', async (req, res) => {
    const { message, user } = req.body;

    if (!conversationHistory[user]) {
        conversationHistory[user] = [];
    }

    conversationHistory[user].push({ role: "user", text: message });

    const lower = message.toLowerCase();
    let response = "";

    // ===== Intent Recognition (LUIS-style simulation) =====
    if (lower.includes("hello") || lower.includes("hi")) {
        response = "Hello! How can I help you today?";
    }
    else if (lower.includes("bye")) {
        response = "Goodbye! Have a great day!";
    }
    else if (lower.includes("where is nepal")) {
        response = "Nepal is a country in South Asia, located between China and India.";
    }
    else if (lower.includes("what is azure")) {
        response = "Azure is Microsoft's cloud computing platform used for hosting applications, AI, databases, and more.";
    }
    else if (lower.includes("who are you")) {
        response = "I am an Azure-hosted chatbot built for demonstration purposes.";
    }
    else {
        response = "I'm not sure about that yet, but I can be trained with more knowledge!";
    }

    conversationHistory[user].push({ role: "bot", text: response });

    res.json({
        reply: response,
        history: conversationHistory[user]
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
