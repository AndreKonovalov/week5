import express from 'express';
import crypto from 'crypto';
import http from 'http';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
import mongoose from 'mongoose';
import UserModel from './models/user.js';
import initApp from './app.js';

const User = UserModel(mongoose);
const app = initApp(express, bodyParser, createReadStream, crypto, http, mongoose, User);
app.listen(process.env.PORT || 2345);
