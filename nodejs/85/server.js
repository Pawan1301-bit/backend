// tthe code in the backend is not visible o client
console.log("Hello World");
const { notStrictEqual } = require('assert');
//npm init -- making it a npm project allow us to install other pakages -- it help you set up the new node js project
// node js -- to use javascript power to process the web into stand alone program
// javascript can be used other than web  
// npm install slugify -- npm install if we want it back 

var slugify = require('slugify');
let a = slugify('some string');     //some-string
console.log(a);
const b  = slugify('some string$f', '_');
console.log(b);



// notes
/* node js is a  tool that let you run javascript code outside the  web browser to build servers and other application */

/*npm node package manager -- a big library with ready to use tools(called pakages) that you can add to your node js project instead of writing all by yourself */