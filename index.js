import express from 'express';
import crypto from 'crypto';
import http from 'http';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';

const port = 80;

import initApp from './app.js';
const app = initApp(express, bodyParser, createReadStream, crypto, http);

app.listen(process.env.PORT || port, () => log('process.pid ' + process.pid + ' port=' + process.env.PORT))
