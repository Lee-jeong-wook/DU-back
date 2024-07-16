// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const cors = require('cors');
const auth = require('./src/routes/auth');
const mongoose = require("mongoose");


const home = require('./src/routes/home');
const verifyToken = require('./src/middleware/middleware');

// 앱 세팅
// 미들웨어
app.use(express.static(`${__dirname}/src`))
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(bodyParser.json());
// 인코딩 위함
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', home);
app.use('/auth', auth);

// app.get('/', verifyToken);

io.on('connection', (socket)=>{
    console.log('연결');
    socket.on('chatting', (data)=>{
        const clientData = data;
        io.emit('chatting', clientData)
    })
})

require('dotenv').config();

const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database:', mongoose.connection.db.databaseName))
  .catch(e => console.error(e));
module.exports = server;