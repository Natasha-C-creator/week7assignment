import express from "express";
const app = express();

import cors from "cors";
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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

app.get("/UserComments", async (req, res) => {
  const query = await db.query("SELECT * FROM UserComments");
  await res.json(query.rows);
});

app.get("/Users", async (req, res) => {
  const query = await db.query("SELECT * FROM Users");
  await res.json(query.rows);
});

app.post("/users", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { firstName, surname, location, side } = req.body;
    const query = await db.query(
      `INSERT INTO Users (firstName, surname, location, side) VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, surname, location, side]
    );
    res.status(201).json(query.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user account." });
  }
});

app.post("/UserComments", async (req, res) => {
  //   const data = req.body.formValues;
  const query = await db.query("SELECT * FROM UserComments");
  //   const query = await db.query(
  //     `INSERT INTO UserComments (id, comments) VALUES ($1, $2, $3, $4)`,
  //     [data.id, data.firstName, data.surname, data.comments]
  //   );
  //   await res.json(query.rows);
  res.json({ message: "Comments loaded" });
});

console.log("Database connection string:", process.env.DB_CONN_STRING);
