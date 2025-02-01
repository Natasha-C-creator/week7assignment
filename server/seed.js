// CREATE TABLE Users (
//     id SERIAL PRIMARY KEY,
//     first_name VARCHAR(255),
//     surname VARCHAR(255),
//     location TEXT,
//     side TEXT
// );

// CREATE TABLE User_Comments (
//     id SERIAL PRIMARY KEY,
//     comment TEXT NOT NULL,
//     user_id INT REFERENCES Users(id)
// );

// import pg from 'pg'
// import dotenv from 'dotenv'
// dotenv.config();

db.query(`INSERT INTO users (first_name, surname, location) VALUES ($1, $2)`, [
  "Tash",
  "C",
  "Ipswich",
]);

// db.query(`INSERT INTO messages (msg_name, content) VALUES ($1, $2)`,['hot take: ', 'I think oranges suck'])
