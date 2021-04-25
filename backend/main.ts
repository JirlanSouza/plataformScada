import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const socketSever = new Server(server);

socketSever.on('connection', (socket) => {
  console.log('Conection ==>>', socket);
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

server.listen(3333, () => { console.info(' Server is runing in 3333 port!')});