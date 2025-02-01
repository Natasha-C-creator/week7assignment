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

app.get("/usercomments", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query("SELECT * FROM usercomments");
  await res.json(query.rows);
});

app.post("/usercomments", async (req, res) => {
  const data = req.body.formValues;
  // const query = await db.query("SELECT * FROM usercomments");
  const query = await db.query(
    `INSERT INTO usercomments (id, comment, user_id) VALUES ($1, $2, $3)`,
    [data.id, data.comment, data.user_id]
  );
  await res.json(query.rows);
});
