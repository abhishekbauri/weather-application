# Weather Application

This is a full-stack Weather Application project built using the React and Node and integrated with a openWeatherMap API for fetching weather data. It allows users to check the current weather and forecast for a given location.

## Technologies Used

- React.js: JavaScript library for building user interfaces
- Express.js: Node.js web application framework for building APIs
- Node.js: JavaScript runtime environment for running server-side code
- Axios: Promise-based HTTP client for making API requests

## Folder Structure

- `client`: React.js frontend code
- `server`: Node.js/Express.js backend code

## Setup For Complete Project (Frontend + Backend)

1. **Clone the repository**
2. **Install dependencies for Frontend**
   - cd `client`
   - `npm i`
3. **Install dependencies for Backend**

   - cd `server`
   - `npm i`

4. **Set up environment variables: Backend**

   Create a `.env` file in the server directory and add set your own environment variables as shown in the `sample.env` file. Add your own API key of OpenWeatherMap.

5. **Set up environment variables: Frontend**

   Create a `.env` file in the client directory and add `VITE_API_URL=http://localhost:8000` i.e url of your server or backend

6. **To run locally**
   - cd server and run `npm run start:dev` (for backend)
   - cd client and run `npm start` (for frontend)
