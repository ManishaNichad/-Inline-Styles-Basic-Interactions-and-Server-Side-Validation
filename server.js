const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory where EJS files are stored
app.set('views', path.join(__dirname, 'views'));

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form (render index.ejs)
app.get('/', (req, res) => {
    res.render('index'); // Render the EJS file instead of sending it directly
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    // Server-side validation
    if (!email.includes('@')) {
        errors.push('Invalid email format');
    }
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        // Send error response if validation fails
        res.send(`Validation failed: ${errors.join(', ')}`);
    } else {
        // Send success response if validation passes
        res.send('Form submitted successfully!');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
