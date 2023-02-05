import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createImage({
    prompt: "A cat pirate with a parrot on its shoulder. Like a Renaissance oil painting.",
    n: 1,
    size: "1024x1024"
});
let image_url = response.data.data[0].url;

console.log(`image url: ${image_url}`)