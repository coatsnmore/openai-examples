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
        logger.info(display);
        chalk.blue('? ');
    }, // Remove ctrl-chars.
});

while (true) {

    console.log(chalk.green(`What kind of animal should we name?`));
    let animal = readlineSync.prompt();

    try {
        // const completion = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: generatePrompt(animal),
        //     temperature: 0.6,//higher the more create, lower the more precisel, [0-1]
        // });

        console.log(chalk.blue(`Excellent Choice!!!`));
        // console.log(`Here are some super hero name suggestions for a "${animal}":\n ${completion.data.choices[0].text}\n`);

    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
    }

    function generatePrompt(animal) {
        const capitalizedAnimal =
            animal[0].toUpperCase() + animal.slice(1).toLowerCase();
        return `Suggest three names for an animal that is a superhero.

          Animal: Cat
          Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
          Animal: Dog
          Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
          Animal: ${capitalizedAnimal}
          Names:`;
    }
}