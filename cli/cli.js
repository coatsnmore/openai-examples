import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

if (!configuration.apiKey) {
    console.log(chalk.red("API Key not configured. Modify your '.env' file with a correct API Key for Open AI with a key of 'OPENAI_API_KEY'."))
    process.exit(1)
}

readlineSync.setDefaultOptions({
    prompt: chalk.blue.bold('? '),
    print: function (display, encoding) {
        // logger.info(display);
        chalk.blue('? ');
    },
});

while (true) {
    console.log(chalk.green(`Enter a prompt and let's see what kind of answer we get:`));
    let promptInput = readlineSync.prompt();

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: promptInput,
            temperature: 0.6,//higher the more creative, lower the more precise, [0-1]
            max_tokens: 256
        });

        let completionText = completion.data.choices[0].text;
        console.log(chalk.blue(`Answer: \n${completionText}`));

    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
    }
}