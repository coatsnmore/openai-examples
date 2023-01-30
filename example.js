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
    }, // Remove ctrl-chars.
});

while (true) {

    console.log(chalk.green(`What kind of animal is your adventurer?`));
    let animal = readlineSync.prompt();

    try {
        console.log(chalk.blue(`Excellent Choice of "${animal}"!...`));
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(animal),
            temperature: 0.6,//higher the more create, lower the more precisel, [0-1]
            max_tokens: 256
        });

        let profile = JSON.parse(completion.data.choices[0].text);
        // let completionText = completion.data.choices[0].text;
        console.log(chalk.blue(`Here is one suggesion of an adventurer: `));
         
        console.log(`
                Name: ${profile.name}
                Age: ${profile.age}
                Species: ${profile.species}
                Favorite Weapon: ${profile.favoriteWeapon}
                Darkest Fear: ${profile.darkestFear}
                Background: ${profile.background}
                \n`);



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
        return `Suggest a profile for an animal adventuer including name, age, favorite weapon, darkest fear. Make it funny and cool.

          Animal: Cat
          Profile:
          {
            "name": "Captain Sharpclaw", 
            "age": "27",
            "species": "Cattus Sneakum",
            "favoriteWeapon": "Laser Eyes",
            "darkestFear": "The illusive white mouse",
            "background" : "The formerly distinginguished Captain Sharpclaw Sailed the highseas with his loyal crew until his first mate betrayed him! The rest of the crew was short-sighted and were easily swayed. The captain was abandoned on a beach left with nothing but his wits and his whiskers."
          }   

          Animal: Dog
          Profile:
          {
            "name": "McBarks-A-Lot", 
            "age"": 4,
            "species": "Doggus Maximus",
            "favoriterWeapon": "Bare Knuckles",
            "darkestFear": "The bottom of an empty bowl",
            "background" : "Born in the gladiator pits of Barkthage, Doggus Maximus, the greatest of his time, pulled himself up by his pawstraps. His great victory brought him his freedom. He yearns for nothing but peace, but he fears the nature of mean will require his skills again in this lifetime."
          }

          Animal: ${capitalizedAnimal}
          Profile:
          `;
    }
}