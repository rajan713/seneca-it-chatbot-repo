// Simple working Echo Bot without Azure authentication

const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

// Create server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

// IMPORTANT: Azure uses process.env.PORT
server.listen(process.env.PORT || 3978, () => {
    console.log(`Server running on ${process.env.PORT || 3978}`);
});

// Remove authentication completely
const adapter = new BotFrameworkAdapter({
    appId: '',
    appPassword: ''
});

// Error handling
adapter.onTurnError = async (context, error) => {
    console.error(error);
    await context.sendActivity("Bot error occurred.");
};

// Main route
server.post('/api/messages', async (req, res) => {
    await adapter.processActivity(req, res, async (context) => {
        if (context.activity.type === 'message') {
            await context.sendActivity(`You said: ${context.activity.text}`);
        }
    });
});
