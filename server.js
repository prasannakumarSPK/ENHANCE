// we turn this java script file as a server


const http = require('http');

const app = require('./backend/app');


// const server = http.createServer((req,res)=>{
// 	res.end('This is my First Response');
// });

console.log("server started in local host:3000");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);

/*why express ? if in above if we want to add responses for different requests like /domain or /products
we have to do it manually or inorder to get request body also we h've to do  same...so to avoid it we use
EXPRESS FRAME WORK
*/
