// using promises -- to work with files
import fs from "fs/promises"

let a  = await fs.readFile("pawan.txt");

let b  = await fs.appendFile("pawan.txt", "\n\n\nthis is a amazing promise");
console.log(a.toString(), b);


