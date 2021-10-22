const express = require("express");
const bodyParser = require("body-parser");
const googleActions = require("actions-on-google");

let ActionSdkAssistant = googleActions.ActionsSdkAssistant;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);

app.get('/', (req, res) => {
    res.send("ping pong!");
});

app.post('/', (req, res) => {
    const assistant = new ActionSdkAssistant({request, response});

    const actionsMap = new Map();
    actionsMap.set(assistant.StandardIntents.MAIN, mainHandler);
    actionsMap.set(assistant.StandardIntents.TEXT, rawInputHandler);

    assistant.handleRequest(actionsMap);
});

let mainHandler = function(assistant){
    let inputPrompt = assistant.buildInputPrompt(false, "Welcome, How can I help you?", ["Say Something!"]);
    assistant.ask(inputPrompt);
}

let rawInputHandler = function(assistant){
    let rawInput = assistant.getRawInput();
    if (rawInput === 'bye') {
        assistant.tell('GoodBye')
    }
}

app.listen(3000, () => {
    console.log('app started listening on port', 3000);
});
