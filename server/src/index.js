const express = require("express");
const oracledb = require("oracledb");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3333;
var password = "";

async function selectAllLoadsById(req, res) {
  const { id } = req.params;
  try {
    connection = await oracledb.getConnection({
      user: "",
      password: password,
      connectString: "",
    });

    console.log("connected to database");
    result = await connection.execute(
      `` // consulte here
    );
  } catch (err) {
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      return res.send("query send no rows");
    } else {
      return res.send(result.rows);
    }
  }
}

app.use(cors());

app.use(express.json());

app.get("/loads/:id", function (req, res) {
  selectAllLoadsById(req, res);
});

app.post("/save", function (req, res) {
  const data = req.body;

  const fileName = new Date().toJSON();

  fs.writeFile(`./src/logs/${fileName}.json`, JSON.stringify(data), function(error) {
    if(error) {
      console.log("ERROR TO SAVE LOG!!!");
      return res.status(500).send("System error!");
    } else {
      return res.status(200).send("Sucess");
    }
  });
});

app.listen(port, () =>
  console.log("nodeOracleRestApi app listening on port %s!", port)
);

