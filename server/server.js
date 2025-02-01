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

app.post("/UserComments", async (req, res) => {
  //   const data = req.body.formValues;
  const query = await db.query("SELECT * FROM UserComments");
  //   const query = await db.query(
  //     `INSERT INTO UserComments (id, comments) VALUES ($1, $2, $3, $4)`,
  //     [data.id, data.first_name, data.surname, data.comments]
  //   );
  //   await res.json(query.rows);
  res.json({ message: "Comments loaded" });
});
