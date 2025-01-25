const fs  = require("fs");      //file system
// console.log(fs);
console.log("starting");
// fs.writeFileSync("pawan.txt", "hello thererer");
fs.writeFile("pawan.txt1", "I am a good boy", ()=>{
    console.log("done");
    fs.readFile("pawan.txt",(error, data)=>{
        console.log(error, data.toString());
        //this reading writing operations can create a callback loop form hell
    })
})

fs.appendFile("pawan.txt", " hello", (e, d)=>{
    console.log(d);
})
console.log("ending");