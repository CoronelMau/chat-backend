import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

console.clear();
config();
app.use(cors());
app.use(morgan({ format: 'dev' }));

mongoose.connect(process.env.MONGODB_URL);

const UserModel = mongoose.model('User', {
  _id: { type: String, _id: false },
  user: { type: String, require: true },
});

const MessageModel = mongoose.model('Messages', {
  user: { type: String, require: true },
  text: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

io.on('connection', (socket) => {
  socket.on('new-user', async (name) => {
    const user = await UserModel.findOne({ user: name }).exec();
    console.log(user);

    if (!user) {
      const newUser = new UserModel({
        _id: uuid(),
        user: name,
      });

      await newUser.save();
    }
    io.emit('new-user', { _id: uuid(), user: name });
  });

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

app.get('/chat', async (req, res) => {
  const messages = await MessageModel.find().exec();
  res.send(messages);
});

server.listen(PORT, () => console.log(`listen in server ${PORT}`));
