const http = require('http');
const fs = require('fs');
const PORT = 8080;


const onJson = (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json"})
    const data = {
        name:"Yudi Krisnandi",
        age:PORT
    }
    response.end(JSON.stringify(data))
}

console.log(`server berjalan pada PORT ${PORT}`);
http.createServer(onJson).listen(PORT);