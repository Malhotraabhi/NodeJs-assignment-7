const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const Students = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
let last_id = 7;
app.get("/api/student/", (req, res) => {
  res.json(Students);
});
app.get("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtered_stu = Students.find((serach_stu) => serach_stu.id === id);

  if (filtered_stu) {
    res.json(filtered_stu);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});
app.post("/api/student", (req, res) => {
  const { name, currentClass, division } = req.body;
  if (name && currentClass && division) {
    const new_stu_register = { id: ++last_id, name, currentClass, division };
    Students.push(new_stu_register);

    res
      .status(201)
      .header({ "Content-Type": "application/x-www-form-urlencoded" })
      .json(new_stu_register);
  } else {
    res.status(400).json({
      error: "Incomplete student details",
    });
  }
});
app.put("/api/student/:id", (req, res) => {
  const name = req.body.name;
  const id = parseInt(req.params.id);
  const filtered_stu = Students.find((serach_stu) => serach_stu.id === id);
  if (!filtered_stu) {
    res.status(400).json({ error: "Invalid student ID" });
  } else if (!name) {
    res.status(400).json({ error: "Invalid student name" });
  } else {
    filtered_stu.name = name;
    res
      .status(200)
      .header({ "Content-Type": "application/x-www-form-urlencoded" })
      .json({ message: "Student record updated successfully",data:filtered_stu });
  }
});

app.delete("/api/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
 const delete_stu=Students.findIndex((serched_stu)=>serched_stu.id===id);
 if(delete_stu!==-1){
  Students.splice(delete_stu, 1);
    res.json({ message: 'Student record deleted successfully' });
 }else{
  res.status(404).json({ error: 'Student not found' });
 }
});


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
