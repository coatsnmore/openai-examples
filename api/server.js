import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

if (!configuration.apiKey) {
    console.error("API Key not configured. Modify your '.env' file with a correct API Key for Open AI with a key of 'OPENAI_API_KEY'.");
    process.exit(1)
}

const app = express();
const port = 4000;

function generatePrompt(animal) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest a profile for an animal adventurer including name, age, favorite weapon, darkest fear, etc. Make it funny, cool, and interesting.

      Animal: Cat
      Profile:
      {
        "name": "Captain Sharpclaw", 
        "age": "27",
        "hp": "43",
        "species": "Cattus Sneakum",
        "homeTown": "Barnacle Bay",
        "class": "Seafarer",
        "mostHiddenSecret": "Loves his dog step-brother", 
        "alignment": "Lawful Neutral",
        "favoriteWeapon": "Laser Eyes",
        "darkestFear": "The illusive white mouse",
        "background" : "The formerly distinginguished Captain Sharpclaw Sailed the highseas with his loyal crew until his first mate betrayed him! The rest of the crew was short-sighted and were easily swayed. The captain was abandoned on a beach left with nothing but his wits and his whiskers."
      }   

      Animal: Dog
      Profile:
      {
        "name": "McBarks-A-Lot", 
        "age"": 4,
        "hp": "54",
        "class": "Fighter",
        "mostHiddenSecret": "Puts peanut butter on pickles",
        "alignment": "Chaotic Neutral",
        "species": "Doggus Maximus",
        "homeTown": "Barkthage",
        "favoriterWeapon": "Bare Knuckles",
        "darkestFear": "The bottom of an empty bowl",
        "background" : "Born in the gladiator pits of Barkthage, Doggus Maximus, the greatest of his time, pulled himself up by his pawstraps. His great victory brought him his freedom. He yearns for nothing but peace, but he fears the nature of mean will require his skills again in this lifetime."
      }

      Animal: ${capitalizedAnimal}
      Profile:
      `;
}

app.get('/characters', async (req, res) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(req.query.animal),
        temperature: 0.6,//higher the more create, lower the more precisel, [0-1]
        max_tokens: 256
    });
    res.send(JSON.parse(completion.data.choices[0].text));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Generate new Characters via 'GET http://localhost:${port}/characters?animal=<type>'`);
    console.log(`For example: 'GET http://localhost:${port}/characters?animal=cat'`);
})