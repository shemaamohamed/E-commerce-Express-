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

async function readStudent(id){
    const student= await studentManager.getStudentById(id);
    console.log(student);
}
async function updatateoneStudent(id, updatedStudent){
    //patch
    await studentManager.updateoneStudent(id, updatedStudent);
    getList();
}
async function updateStudentNewData(id, updatedStudent){
    //put
    await studentManager.updateStudentNewData(id, updatedStudent);
    getList();
}
async function addnewStudent(student) {
    await studentManager.addnewStudent(student);
    getList();
}
async function removeStudent(id){
    await studentManager.removeStudent(id);
    getList();
}
async function  removeAllStudents(){
    await studentManager. removeAllStudents();
    getList();
}
async function filterStudentsByAge(from,to){
   const filteredStudents= await studentManager.filterStudentsByAge(from, to);
   console.log(filteredStudents);
}
filterStudentsByAge(20,25);
// removeAllStudents();
// removeStudent(1726081130924)

// addnewStudent({"name":"huy","age":20})
    

// readStudent(1726075426620)
// updatateoneStudent(1726075426620, {"age":21});
// updateStudentNewData(1726075426621,{"age":25})
