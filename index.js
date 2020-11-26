import x from 'express';
import crypto from 'crypto';
const { log } = console;

const hashes = crypto.getHashes();
console.log(hashes); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]

/*let crypto
try {
  crypto = require('crypto')
} catch (err) {
  console.log('Crypto module is unavailable')
}*/
const port = 80;

import initApp from './app.js';
//const app = initApp(express, bodyParser, createReadStream, crypto, http);
const app = initApp(x);

app.listen(process.env.PORT || port, () => log('process.pid ' + process.pid + ' port=' + process.env.PORT))

