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

function generatePrompt(type) {
    const capitalizedType =
        type[0].toUpperCase() + type.slice(1).toLowerCase();
    return `Suggest a profile for an adventurer given a Type including name, age, favorite weapon, darkest fear, etc. Make it funny, cool, and interesting.

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

      Type: ${capitalizedType}
      Profile:
      `;
}

app.get('/characters', async (req, res) => {

    let completion, generatedImage, imageVariation, type = req.query.type;
    try {
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(type),
            temperature: 0.6,//higher the more create, lower the more precisel, [0-1]
            max_tokens: 256
        });
    } catch (e) {
        console.log(e);
        throw new Error("Error getting completion...");
    }

    let character = JSON.parse(completion.data.choices[0].text);

    //Now take the portait and include it in a portrait card like a character in a trading card game. Include the stats of the adventure like their, name, ${character.name} and background ${character.background}.
    try {
        generatedImage = await openai.createImage({
            // prompt: `Generate an image that is a hand-painted portait of a ${req.query.type} who is also an RPG hero adventurer. Include vibrant colors and an epic medieval fantasy theme. The adventurer is a ${req.query.animal} with a class of ${character.class}, age ${character.age}, an alignment of ${character.alignment}, holding their ${character.favoriteWeapon}. Ensure the entire character is visible in the image. Try to make it an active scene. The portrait background should be similar to the theme of their home town, ${character.homeTown}. Their character story background is ${character.background}`,
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
        res.send(character);
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Generate new Characters via 'GET http://localhost:${port}/characters?type=<type>'`);
    console.log(`For example: 'GET http://localhost:${port}/characters?type=cat'`);
    console.log(`For HTML: 'GET http://localhost:${port}/characters?type=cat&html=true'`);
})