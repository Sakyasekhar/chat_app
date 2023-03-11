const express = require('express');
const Controller = require('../controllers/chat_controllers');

const router = express.Router();



router.get('/', Controller.index);
router.post('/room', Controller.post_room);
router.get('/room', Controller.get_room);
router.get('/room/chat-history', Controller.get_chat_history);
router.post('/messages', Controller.post_message);



module.exports=router;