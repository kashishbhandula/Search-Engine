# Project Setup

## Prerequisites
1. **Node.js**: Ensure you have Node.js installed. [Download here](https://nodejs.org/).
2. **NPM**: Comes bundled with Node.js, but make sure it is updated.

## Installation

1. **Install Dependencies**: Run the following command to install all required packages.
    ```bash
    npm install
    ```

2. **Start Development Server**: To run the project in development mode, execute:
    ```bash
    npm run dev
    ```

## Environment Variables

Create a `.env` file in the root of your project directory with the following content:

    ```javascript
    module.exports = {
        GOOGLE_API_KEY: "",
        GOOGLE_API_CX: "",
        GEMINI_API_KEY: "",
    };
    ```

### API Keys

- **GOOGLE_API_KEY && GOOGLE_API_CX from here**: Refer to the [Custom Search JSON API documentation](https://developers.google.com/custom-search/v1/overview) for more details on the search API.
- **GEMINI_API_KEY**: Refer to the [Gemini API documentation](https://ai.google.dev/gemini-api?gad_source=1&gclid=Cj0KCQjwvpy5BhDTARIsAHSilyllaj7_civCW5-NBN2Yn-jy9vgiaROUtDT2yVkOLJkn_A6Xs9P0LuoaAtvTEALw_wcB) to understand the usage of the Gemini API.

## Run Project
After setting up the environment variables and installing dependencies, start the development server as specified above. 


