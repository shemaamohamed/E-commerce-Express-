// const fs= require('fs').promises
// const path = require('path')
// const dataFilepath= path.join(__dirname,'students.json')

// saveStudents(students);

// readStudents();
// let students=[];
const StudentManager=require('./StudentManager');
const studentManager= new StudentManager();
//crud
async  function getList(){
    const studentlist= await studentManager.getAllStudents();
    console.log(studentlist);
}
async function addStudent(student){
   
    await studentManager.addStudent(student);
    getList();
}
async function readStudent(id){
    const student= await studentManager.getStudentById(id);
    console.log(student);
}
readStudent(1726075426620)
