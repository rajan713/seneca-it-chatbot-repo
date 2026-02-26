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
    
    const lower = message.toLowerCase();

if (lower.includes("hello")) {
    response = "Hello! How can I help you today?";
}
else if (lower.includes("bye")) {
    response = "Goodbye! Have a great day.";
}
else if (lower.includes("where is nepal")) {
    response = "Nepal is a country in South Asia, located between China and India.";
}
else if (lower.includes("what is azure")) {
    response = "Azure is Microsoft's cloud computing platform.";
}
else {
    response = "I'm not sure, but I can learn that later!";
}

    conversationHistory[user].push(response);

    res.json({ reply: response });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running...");
});
