const http = require('http');
const fs = require('fs');
const PORT = 8080;

const onRequest = (request, response) => {
    response.writeHead(200,{ "Content-Type": "text/html"})
    fs.readFile("index.html", null, (error, data) => {
        if(error){
            response.writeHead(404)
            response.write("file not found")
        }else{
            response.write(data)
        }
        response.end()
    })
} 


//menggunakan data json
// const onJson = (request, response) => {
//     response.writeHead(200, { "Content-Type": "application/json"})
//     const data = {
//         name:"Yudi Krisnandi",
//         age:PORT
//     }
//     response.end(JSON.stringify(data))
// }

console.log(`server berjalan pada PORT ${PORT}`);
http.createServer(onRequest).listen(PORT);