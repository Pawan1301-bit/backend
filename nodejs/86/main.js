// // const http = require('node:http');
// //required is used to import module in our ssytem
// import http from "http";
// const hostname  = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end("<h1>Hello world<\h1>");
// });

// server.listen(port, hostname, ()=>{
//     console.log(`server is running at http://${hostname}:${port}/`);
// });

// only for ecamascript -- add type: module in json 
// import {a, b} from "./mymodule.js"
// console.log(a, b);


// import  pawan from "./mymodule.js"   //pawan = obj
// console.log(pawan);

//for common js -- we do not have to write anything its bydefault
// const a = require("./mymodule2.js");
// console.log(a);

import pawan from "./mymodule.js";
console.log(pawan);


// notes
/* CommonJS mostly used for Node.js
   It uses require to import modules and module.export to export them
   ex module.export = {var}
   const{ add } = require('filename')
*/

/* export const add = ;
import {add} from 'filename' */


/* difference between module and pakages
   module -- a single file or a collection of functions that can be imported into other files
   pakages -- collection of modules it include additional metadata lie package.json to describe the package usually distributed via pakage manager like npm
*/

//for importing -- we use {a} for named for default we use obj;