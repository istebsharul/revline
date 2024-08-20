console.log('Starting the server...');

import app from './app.js'; // Make sure this line is correct
import connectDatabase from './config/db.js';

const port = process.env.PORT || 4000;

connectDatabase();


app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
