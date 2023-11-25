import OpenAI from 'openai';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

readlineSync.setDefaultOptions({
    prompt: chalk.blue.bold('? '),
    print: function (display, encoding) {
        // logger.info(display);
        chalk.blue('? ');
    },
});

let chat = [];

while (true) {
    console.log(chalk.green(`Enter a prompt and let's see what kind of answer we get:`));
    
    let promptInput = readlineSync.prompt();

    if (promptInput == "exit")
        process.exit(0);

    chat.push({ role: 'user', content: promptInput })

    try {
        const params = {
            model: "gpt-3.5-turbo-1106",
            messages: chat
        }

        const completion = await openai.chat.completions.create(params);
        chat.push(completion.choices[0].message);
        // console.dir(chat)

        let completionText = completion.choices[0].message.content;
        console.log(chalk.blue(`Answer: \n${completionText}`));
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
        process.exit(1);
    }
}