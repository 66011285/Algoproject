const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Start the server and listen on the local IP address
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Access it through your local IP on http://<your-ip-address>:${port}`);
});
