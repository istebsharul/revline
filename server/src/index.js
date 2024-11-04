console.log('Starting the server...');

import { createServer } from 'http'; // Use http to create the server
import app from './app.js'; // Import the configured express app
import connectDatabase from './config/db.js'; // Your DB connection setup

// Set the port to either environment variable or default to 4000
const port = process.env.PORT || 4000;

// Call the database connection function
connectDatabase();

// Create HTTP server with Express app
const server = createServer(app);

// Start the server with Express
server.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

export default server;

// console.log('Starting the server...');

// import app from './app.js'; // Make sure this line is correct
// import connectDatabase from './config/db.js';

// const port = process.env.PORT || 4000;

// connectDatabase();


// app.listen(port, () => {
//     console.log(`Server is working on http://localhost:${port}`);
// });
