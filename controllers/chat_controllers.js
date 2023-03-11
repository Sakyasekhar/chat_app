const Chat = require('../models/chat'); 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse request body as JSON
app.use(bodyParser.json());

const index=(req,res)=>{ 
  res.render('index')
}

const post_room=(req,res)=>{ 
  username = req.body.username;
  roomname = req.body.roomname;

  res.redirect(`/room?username=${username}&roomname=${roomname}`)
}

const get_room = (req, res) => {
  const username = req.query.username;
  const roomname = req.query.roomname;
  res.render('room', { Username: username });
};





// const post_message = (req, res) => {
//   const group_id = req.body.group_id
//   const message = req.body.message
//   console.log('Group ID:', req.body.group_id);
//   console.log('Message:', req.body.message);
//   console.log('req.body:', req.body);



//   const chat = new Chat({ group_id: group_id, messages: message });
//   console.log('Chat:', chat)
//   chat.save()
//     .then(() => {
//       console.log('Message saved successfully!');
//       res.status(200).send('Message saved successfully!');

//     })
//     .catch((err) => {
//       console.error('Error saving message:', err);
//       res.status(500).send('Error saving message');
//     });
// }



const post_message = (req, res) => {
  const group_id = req.body.group_id
  const message = req.body.message

  Chat.findOneAndUpdate(
    { group_id: group_id },
    { $push: { messages: message } },
    { upsert: true }
  )
  .then(() => {
    console.log('Message saved successfully!');
    res.status(200).send('Message saved successfully!');
  })
  .catch((err) => {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message');
  });
}




const get_chat_history = (req, res) => {
  const group_id = req.query.group_id
  console.log(`Fetching chat history for group_id=${group_id}...`);
  Chat.find({ group_id: group_id }, (err, chats) => {
    if (err) {
      console.error('Error fetching chat history:', err);
      res.status(500).send('Error fetching chat history');
    } else {
      console.log(`Found ${chats.length} chats for group_id=${group_id}`);
      res.status(200).json({ messages: chats });
      // res.render('room', { Username: username });
    }
  });
};


module.exports={
  index,
  post_room,
  get_room,
  post_message,
  get_chat_history
}