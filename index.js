const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anup",
  database: "employeedb",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("db connection succeded");
  } else {
    console.log(
      "db connection failed \n error" + JSON.stringify(err, undefined, 2)
    );
  }

  // mysqlConnection.query("create database basant",(err,result) =>{
  // if(!err){
  //   console.log("database basant created");
  // }
  // else{
  //   console.log("database basant failed");
  // }
  // })
});

app.get("/employee", (req, res) => {
  mysqlConnection.query("SELECT * FROM employee", (err, rows, field) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.delete("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) {
        res.send("DELETE SUCCESSFUL");
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/employee", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @EmpName = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@EmpName,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.EmpName, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) {
        rows.forEach(element => {
          if(element.constructor == Array)
          res.send("inserted Employee id :" + element[0].EmpID);
        });
      } else {
        console.log(err);
      }
    }
  );
});


app.put("/employee", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @EmpName = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@EmpName,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.EmpName, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) {
       res.send("updated successfully")
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("hy basant");
});
