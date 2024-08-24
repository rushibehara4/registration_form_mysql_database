const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

database.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/users", (request, response) => {
  const sql = "SELECT * FROM user_details";

  database.query(sql, (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message });
    }
    return response.json(results);
  });
});

app.post("/signup", (request, response) => {
    const { username, password } = request.body;
  
    const checkUserSql = "SELECT * FROM user_details WHERE username = ?";
    database.query(checkUserSql, [username], (error, results) => {
      if (error) {
        return response.status(500).json({ error: "Database error." });
      }
  
      if (results.length > 0) {
        return response.status(400).json({ message: "User already exists." });
      }
  
      const insertUserSql = "INSERT INTO user_details (username, password) VALUES (?, ?)";
      const values = [username, password];
      database.query(insertUserSql, values, (error, data) => {
        if (error) {
          return response.status(500).json({ error: "Failed to create user." });
        }
        return response.status(201).json({ message: "User created successfully!" });
      });
    });
  });
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
