// const app = require('../app');
import server from '../app.js';
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`localhost:${PORT}에서 가동 중`);
});