const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');
const ps = require('prompt-sync');
const prompt = ps();


//SERVER
const server = http.createServer((req, res) => {
    res.end(req.url);
})


//EMPLOYEE

emparray=[{'name':'emp4','age':'23'},{'name':'emp1','age':'55'}];

//Write to File
function writeToFile(data){
    jsonData = JSON.stringify(data)
    fs.writeFile('./empdata.json',jsonData, 'utf-8', (err)=>{
        if(err){
            console.log("Error writing file!");
        }
        
    });
}

// //Read from File
// function readFromFile(){
//     const empdata = fs.readFile('./empdata.json', 'utf-8', (err,data)=>{
//             if(err){
//                 console.log("Error reading file!");
//             }
//             else{
//                 jsonObj = JSON.parse(data)
//                 return jsonObj;
//             }
//         })
// }

//CREATE EMP
function createEmp(){
    
    const ename = prompt("Enter emp name: ");
    const eage = prompt("Enter emp age:");
    emparray.push({name:ename,age:eage});
    writeToFile(emparray);
    console.log(emparray);

}


//READ EMP DETAILS
function findEmp(name){
    
    const findEmp = prompt("Enter emp name to fetch deets: ")
    const result = emparray.find( ({ name }) => name === findEmp );
    if (result){
        console.log(result);
        return result;
    }
    else{
        console.log("Emp doesnt exist");
    }
}


//DELETE EMP
function deleteEmp(){
    const deleteEmp = prompt("Enter emp's name to be deleted: ");
    const result = emparray.find( ({ name }) => name === deleteEmp );
    if (result){
        idx = emparray.indexOf(result);
        delete emparray[idx];
        console.log(emparray);
    }
    else{
        console.log("Emp doesnt exist");

    
    }
}


//UPDATE EMP
function updateEmp(name){
    
    const updateEmp = prompt("Enter emp name to update deets: ")
    const result = emparray.find( ({ name }) => name === updateEmp );
    if (result){
                idx = emparray.indexOf(result);
                newName = prompt("Enter updated name: ");
                newAge = prompt("Enter update age: ");
                emparray[idx].name = newName;
                emparray[idx].age = newAge;
                console.log(emparray);
            }
        else{
            console.log("Emp doesnt exist");
        }
}


createEmp();
findEmp();
updateEmp();
deleteEmp();








server.listen(8000,'127.0.0.1',() =>{
    console.log("Server listening!");
})


