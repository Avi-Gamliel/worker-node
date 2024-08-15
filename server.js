const { fork } = require('child_process');
const http = require('http');
const express = require('express')
const app = express()
const server = http.createServer(app)


app.get('/play-worker', (req,res)=>{
    const worker = fork('./worker.js');
    worker.send({ data: 'example data' });
    worker.on('message', (data) => {
        res.json({"msg": "* Complete worker"})
    });
    worker.on('error', (error) => {
        res.json({"msg": `There is an Error ${error.message}`})
    });
    worker.on('exit', (code) => {
        console.log(`Worker exited with code ${code}`);
    });
})

app.get('/health', (req, res)=>{
    res.json({"Status": "Up"})
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
