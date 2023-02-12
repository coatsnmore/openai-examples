import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';
import cors from 'cors';

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
app.use(cors());
const port = 4000;
// app.use(express.static("web"));

function generatePrompt(type, theme) {

    const capitalizedTheme =
        theme[0].toUpperCase() + theme.slice(1).toLowerCase();

    const capitalizedType =
        type[0].toUpperCase() + type.slice(1).toLowerCase();

    return `Suggest a profile for an adventurer given a Type and Theme including name, age, favorite weapon, darkest fear, etc. Make it funny, cool, and interesting.

      Theme: Hero Fantasy
      Type: Cat
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

      Theme: Gladiator Heroics
      Type: Dog
      Profile:
      {
        "name": "McBarks-A-Lot", 
        "age": 4,
        "hp": "54",
        "class": "Fighter",
        "mostHiddenSecret": "Puts peanut butter on pickles",
        "alignment": "Chaotic Neutral",
        "species": "Doggus Maximus",
        "homeTown": "Barkthage",
        "favoriteWeapon": "Bare Knuckles",
        "darkestFear": "The bottom of an empty bowl",
        "background" : "Born in the gladiator pits of Barkthage, Doggus Maximus, the greatest of his time, pulled himself up by his pawstraps. His great victory brought him his freedom. He yearns for nothing but peace, but he fears the nature of mean will require his skills again in this lifetime."
      }

      Theme: ${capitalizedTheme}
      Type: ${capitalizedType}
      Profile:
      `;
}

app.get('/characters', async (req, res) => {

    let completion, generatedImage, type = req.query.type, theme = req.query.theme;

    if (!type) {
        type = 'Clown';

    }
    if (!theme) {
        theme = 'Medieval Fantasy';
    }

    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(type, theme),
            temperature: 0.6,//higher the more creative, lower the more precise, [0-1]
            max_tokens: 256
        });
    } catch (e) {
        console.log(e);
        throw new Error("Error getting completion...");
    }

    let character = JSON.parse(completion.data.choices[0].text);

    try {
        generatedImage = await openai.createImage({
            prompt: `A hand-drawn portaint of a ${type} adventurer with a class of ${character.class}, age ${character.age}, an alignment of ${character.alignment}, and using their favorite weapon, ${character.favoriteWeapon}. Make it vibrant, epic look like fine oil painting.`,
            n: 1,
            size: "1024x1024",
            "response_format": "b64_json"
        });
    } catch (e) {
        console.log(e);
        throw new Error("Error getting image");
    }

    let image_base64 = generatedImage.data.data[0].b64_json;

    if (req.query.html) {
        res.send(`
        <html>
            <body style="font-size: 18pt; height:100%">
                <div><b>Name:</b> ${character.name}</div>
                <div><b>Age:</b> ${character.age}</div>
                <div><b>Alignment:</b> ${character.alignment}</div>
                <div><b>HP:</b> ${character.hp}</div>
                <div><b>Species:</b> ${character.species}</div>
                <div><b>Class:</b> ${character.class}</div>
                <div><b>Home Town:</b> ${character.homeTown}</div>
                <div><b>Favorite Weapon:</b> ${character.favoriteWeapon}</div>
                <div><b>Darkest Fear:</b> ${character.darkestFear}</div>
                <div><b>Hidden Secret:</b> ${character.mostHiddenSecret}</div>
                <div style="width: 50%;"><b>Background:</b> ${character.background}</div>

                <p>
                    <img src="data:image/png;base64,${image_base64}" style="height: 50%;">
                </p>
            </body>
        </html>
        `);
    } else {
        character.image = image_base64;
        res.send(character);
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Generate new Characters via 'GET http://localhost:${port}/characters?type=<type>'`);
    console.log(`For example: 'GET http://localhost:${port}/characters?type=cat'`);
    console.log(`For HTML: 'GET http://localhost:${port}/characters?type=cat&html=true'`);
})