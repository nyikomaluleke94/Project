const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'tevin', // Replace with your MySQL password
  database: 'my_database' // Replace with the name of your database
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');

  // Create a table to store survey data if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS surveys (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255),
      email VARCHAR(255),
      dob DATE,
      contactNumber VARCHAR(20),
      favoriteFood VARCHAR(50),
      movie VARCHAR(50),
      radio VARCHAR(50),
      eatOut VARCHAR(50),
      tv VARCHAR(50)
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Table surveys created or already exists');

    // Add event listener to submit button
    document.getElementById('submit-survey').addEventListener('click', function() {
      let fullName = document.getElementById('fullName').value.trim();
      let email = document.getElementById('email').value.trim();
      let dob = document.getElementById('dob').value;
      let contactNumber = document.getElementById('contactNumber').value.trim();
      let favoriteFood = document.querySelector('input[name="favoriteFood"]:checked').value;
      let movie = document.querySelector('input[name="movie"]:checked').value;
      let radio = document.querySelector('input[name="radio"]:checked').value;
      let eatOut = document.querySelector('input[name="eat_out"]:checked').value;
      let tv = document.querySelector('input[name="tv"]:checked').value;

      // Insert survey data into the database
      const insertQuery = `
        INSERT INTO surveys (fullName, email, dob, contactNumber, favoriteFood, movie, radio, eatOut, tv)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [fullName, email, dob, contactNumber, favoriteFood, movie, radio, eatOut, tv];

      connection.query(insertQuery, values, (err, result) => {
        if (err) {
          alert('Error: Failed to submit survey data');
          throw err;
        }
        console.log('Survey data inserted successfully');
        alert('Survey submitted successfully!');
        document.getElementById('survey-form').reset();
        document.getElementById('fill-out-survey-link').scrollIntoView();
      });
    });
  });
});
