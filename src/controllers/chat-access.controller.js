import MessageModel from '../schemas/message.schema.js';

const chatAccessController = async (req, res) => {
  const messages = await MessageModel.find().exec();
  return res.send(messages);
};

export default chatAccessController;
