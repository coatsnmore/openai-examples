# OpenAI API Example Usage

This is a collection of example projects in NodeJS that makes use of the [OpenAI API](https://openai.com/api/). This project includes example code that uses AI to generate [RPG](https://en.wikipedia.org/wiki/Role-playing_game) characters, including interesting personalities, story backgrounds, and a generated portait to go with it.

You will need to create an [API Key on the OpenAI website](https://beta.openai.com/account/api-keys) before continuing. The free trial currently includes $18 in credits.

I have [an example deployment on my website](https://spacecat.org/ai).

Here are some example RPG characters generated by OpenAI (more in `/example-images`): 

![stripes zebra](example-images/stripes.png)
![Sir Slitherington](example-images/SirSlitherington.png)
![Giraffey Magoo](example-images/Giraffey%20Magoo.png)

# How to Run These Examples Locally

## Prerequisites to Run Locally

* A Personal Computer
* [Install Git](https://git-scm.com/downloads)
* [Install NodeJS](https://nodejs.org/en/download/)
* [Create an Open AI Account and API Key through the their website](https://beta.openai.com/account/api-keys)

## Use a free Gitpod cloud IDE (optional)

If you have a Github.com account and don't have a personal computer with the ability to install new tools, you can use this link to open the code repository in an epehemeral cloud IDE (Integrated Desktop Environment) hosted by Gitpod.io:
https://gitpod.io/?editor=code#https://github.com/coatsnmore/openai-examples

>DISCLAIMER: Beware keeping secrets there, though. These environments are ephemeral, but they are someone else's.

## Install and Run

1. Clone this repo (if you didn't use the Gitpod IDE option)

    ```bash
    $ git clone https://github.com/coatsnmore/openapi-examples
    $ cd openapi-examples
    ```

2. Install the requirements

   ```bash
   $ npm install
   ```

3. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```

4. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file

5. Run the CLI

    ```bash
    $ npm run cli
    ```

6. Run the API

    ```bash
    $ npm run api
    ```

6. Run the Web

    ```bash
    $ npm run web
    ```

### Learn More

- [Azure hosting Open AI Services](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/limited-access?context=%2Fazure%2Fcognitive-services%2Fopenai%2Fcontext%2Fcontext)
- [Sampling Temperature and Language Models](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277)

### Some Other AI Tools to Consider

- [Midjourney - Another Image Generator using Stable Diffusion](https://midjourney.com/)
- [Open Assistant - an OSS alternative to ChatGPT](https://github.com/LAION-AI/Open-Assistant) 
