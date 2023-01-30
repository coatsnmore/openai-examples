# OpenAI API Example Usage

This is a CLI example project in NodeJS that makes use of [a NodeJS project](https://github.com/openai/openai-node) maintained by OpenAI. You will also need to create an [API Key on the OpenAI website](https://beta.openai.com/account/api-keys).

## Prereqs

* NodeJS + NPM
* Git

## Install and Run

1. Clone this repo

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

5. Run the example

    ```bash
    $ npm run example
    ```

6. Run the API

    ```bash
    $ npm run api
    ```

### Some Interesting Reads

* [Sampling Temperature and Language Models](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277)