import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './src/routes/user.routes.js';
import MessageModel from './src/schemas/message.schema.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

console.clear();
config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/user', userRouter);

mongoose.connect(process.env.MONGODB_URL);

io.on('connection', (socket) => {
  socket.on('new-message', async (message) => {
    if (message.user) {
      const Message = new MessageModel({
        user: message.user,
        text: message.message,
        date: new Date(),
      });

      await Message.save();

      io.emit('new-message', {
        user: message.user,
        text: message.message,
        date: new Date(),
      });
    }
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`listen in server ${PORT}`));
