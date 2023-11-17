const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json("From Backend ");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tododb",
});

app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/getData", (req, res) => {
  var Task = req.body.Task;
  console.log(Task);
  res.json({ message: "Data received successfully" });
  db.query(
    "INSERT INTO tasks (name) VALUES (?)",
    [Task],
    function (err, result) {
      if (err) return res.json(err);
      else {
        console.log("1 record inserted");
          console.log("Number of rows affected: " + result.affectedRows);
      }
    }
  );
});

app.post("/DeleteData", (req, res) => {
  var deleteTask = req.body.deleteTask;
  console.log(deleteTask);
  res.json({ message: `Data received successfully:${deleteTask}` });
  db.query(
    `DELETE FROM tasks WHERE name='${deleteTask}'`,
    function (err, result) {
      if (err) return res.json(err);
      else {
        console.log("1 record Deleted");
          console.log("Number of records inserted: " + result.affectedRows);
      }
    }
  );
});

// db.query(
//     "DELETE FROM tasks WHERE name='Hello'",
//     function (err, result) {
//       if (err) return res.json(err);
//       else {
//         console.log("1 record Deleted");
//           console.log("Number of records Deleted: " + result.affectedRows);
//       }
//     }
//   );

app.listen(8081, () => {
  console.log("listening on port 8081");
});
