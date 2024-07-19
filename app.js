import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import home from './src/routes/home/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// 앱 세팅
// 미들웨어
app.use(express.static(path.join(__dirname, 'src')));
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(bodyParser.json());
// 인코딩 위함
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);

io.on('connection', (socket) => {
    console.log('연결');
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });
    
      socket.on('message', ({ roomId, message }) => {
        io.to(roomId).emit('message', message);
      });
});

const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database:', mongoose.connection.db.databaseName))
  .catch(e => console.error(e));

export default server;