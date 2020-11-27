import express from 'express';
import crypto from 'crypto';
import http from 'http';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
const { log } = console;

const port = 80;

const hashes = crypto.getHashes();
console.log(hashes); // ['DSA', 'DSA-SHA', 'DSA-SHA1', ...]

import initApp from './app.js';
const app = initApp(express, bodyParser, createReadStream, crypto, http);
//const app = initApp(express);

app.listen(process.env.PORT || port, () => log('process.pid ' + process.pid + ' port=' + process.env.PORT))
