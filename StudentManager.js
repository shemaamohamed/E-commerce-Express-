//Encupsolation
const fs = require("fs").promises;
const path = require('path')
const dataFilepath= path.join(__dirname,'students.json')
class StudentManager{
    constructor(){
        this.students=[];
    }
    //addstudent
   async addnewStudent(student){
        await this.loadStudents();
        // if(!student.name) throw new Error("Name is required");
        //from file to app
        this.students.push({...student,id:Date.now()+Math.floor(Math.random()*100)});
        await this.saveStudents();
    }
    //removestudent
    async removeStudent(id){
        await this.loadStudents();
        // this.students= this.students.filter(student=>student.id!==id);
        const index= this.students.findIndex(student=>student.id.toString()===id.toString());
        if(index>-1) {
            this.students.splice(index,1);
            await this.saveStudents();

        }
        
    }
    async removeAllStudents(){
        this.students=[];
        await this.saveStudents();
    }
    //updatestudent
    //create
    async saveStudents(){
        try{
            const studentJson= JSON.stringify(this.students, null, 2);
            await fs.writeFile(dataFilepath, studentJson);
            console.log("Students saved successfully.");

        }catch(err){
            console.error("Error saving students:", err);
        }
        //from app to file
    }
    //read
    async  loadStudents(){
        try{
            const data= await fs.readFile(dataFilepath, "utf-8");
            this.students= JSON.parse(data);
        }catch(err){
            this.students= [];
            console.log("No students file found, starting with an empty list.");

        }finally{
            console.log("Load operation completed.");

        }
        
    }
    //updatestudent

    async updateoneStudent(id, updatedStudent){
        await this.loadStudents();
        const index= this.students.findIndex(student=>student.id.toString()===id.toString());
        if(index!==-1){
            const student= this.students[index];
            this.students[index]={...student,...updatedStudent};
            await this.saveStudents();
            return true;
        }
        return false;
    }
    async updateStudentNewData(id, updatedStudent){
        await this.loadStudents();
        const index= this.students.findIndex(student=>student.id===id);
        if(index!==-1){
            const student= this.students[index];
            this.students[index]={id,...updatedStudent};
            await this.saveStudents();
            return true;
        }
        return false;
    }

    async getAllStudents(){
        await this.loadStudents();
        return this.students;
    }
    async getStudentById(id){
        await this.loadStudents();
        const studentobj=this.students.find(student=>student.id.toString() === id.toString());
        if(studentobj){
            return studentobj;
        }
        
    }
   async filterStudentsByAge(startage,endage){
        await this.loadStudents();
        const filteredStudents= this.students.filter(student=>student.age>=startage && student.age<=endage);
        if(filteredStudents.length>0){
            return filteredStudents;
        }
    }
   
}
module.exports =StudentManager;