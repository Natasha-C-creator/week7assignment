//I need a route to CREATE new data in the database --> the new data here is stored in the body object

//===========================================

//?STRETCH GOAL: I want to DELETE data from the database --> use params

import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.json({ message: "This is the route of the root!" });
});

const dbConnectionString = process.env.DB_CONN_STRING;
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/Users", async (req, res) => {
  const query = await db.query("SELECT * FROM Users");
  await res.json(query.rows);
});

app.post("/Users", async (req, res) => {
  try {
    const { firstName, surname, location, side } = req.body;
    const result = await db.query(
      `INSERT INTO Users (first_name, surname, location, side) VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, surname, location, side]
    );
    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user account." });
  }
});

app.get("/UserComments", async (req, res) => {
  const query = await db.query("SELECT * FROM UserComments");
  await res.json(query.rows);
});

app.post("/UserComments", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query(
    `INSERT INTO UserComments (id, comments) VALUES ($1, $2)`,
    [data.id, data.comments]
  );
  await res.json(query.rows);
});

app.post("/UserComments", async (req, res) => {
  const { userId, comment } = req.body;
  const query = await db.query(
    `INSERT INTO UserComments (id, comments) VALUES ($1, $2) RETURNING *`,
    [userId, comment]
  );
  const newComment = query.rows[0]; // Get the newly inserted comment
    res.status(201).json(newComment); // Respond with the new comment data
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment." });
});