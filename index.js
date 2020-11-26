import x from 'express';
const { log } = console;

const port = 80;

import initApp from './app.js';
//const app = initApp(express, bodyParser, createReadStream, crypto, http);
const app = initApp(x);

app.listen(process.env.PORT || port, () => {
  log('process.pid ' + process.pid + ' port=' + process.env.PORT);
})


