import { Configuration, OpenAIApi } from "openai";
// import dotenv from 'dotenv';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export const handler = async(event, context) => {

// dotenv.config();

// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// const secret_name = "openai/apikey";

// const client = new SecretsManagerClient({
//   region: "us-east-1",
// });

// let secretResponse;

// try {
//   secretResponse = await client.send(
//     new GetSecretValueCommand({
//       SecretId: secret_name,
//       VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//     })
//   );
// } catch (error) {
//   // For a list of exceptions thrown, see
//   // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//   throw error;
// }

// const secret = secretResponse.SecretString;


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

if (!configuration.apiKey) {
    console.error("API Key not configured. Modify your '.env' file with a correct API Key for Open AI with a key of 'OPENAI_API_KEY'.");
}  
    
    
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
        "age": 4,
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

    const array = ['dog', 'cat', 'bear', 'salamander', 'horse', 'seal', 'squirrel', 'giraffe', 'monkey', 'porcupine', 'mink', 'donkey', 'moose', 'gorilla', 'zebra', 'hyena', 'deer', 'elk', 'bird', 'lizard', 'snake'];
    const randomAnimal = array[Math.floor(Math.random() * array.length)];

    console.log(`completing...`);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(randomAnimal),
        temperature: 0.6,//higher the more create, lower the more precisel, [0-1]
        max_tokens: 256
    });

  
    let character = JSON.parse(completion.data.choices[0].text);
    // console.log(`prompt: ${completion.prompt}`);

    const image = await openai.createImage({
        prompt: `Generate an image for an adventurer portrait hand painted detailed mature vibrant colors ${randomAnimal} ${character.favoriteWeapon} ${character.class} ${character.name} ${character.mostHiddenSecret} ${character.alignment} ${character.background}`,
        n: 1,
        size: "1024x1024",
    });
    let image_url = image.data.data[0].url;

    console.log(`image url: ${image_url}`);
    character.image = image_url;

    // console.log(`req.query.html: ${req.query.html}`);

  let bodyHtml = `
        <html>
            <body>
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
                    <img src="${character.image}" style="height: 50%;">
                </p>
            </body>
        </html>
        `;
   
    console.log(`bodyHtml: ${bodyHtml}`);
    

    const response = {
        statusCode: 200,
        body: bodyHtml,
        headers: {
        "content-type": "text/html"
        }
    };
    return response;
    
    // context.succeed(bodyHtml);

}