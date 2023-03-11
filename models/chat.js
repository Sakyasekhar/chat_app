const mongoose = require ( 'mongoose');
const schema = mongoose. Schema;
const chatSchema = new schema({
   group_id: String,
   messages: [
     {
       message_id: String,
       sender_id: String,
       timestamp: Date,
       message_text: String
     }
   ]
 })
 
const Chat = mongoose. model ('Chat' , chatSchema) ;
module.exports=Chat;



// const mongoose = require('mongoose');
// const schema = mongoose.Schema;

// const taskSchema = new schema({
//     title: {
//         type : String,
//         required: true
//     },
//     body: {
//         type : String,
//         required: true
//     }
// })
// const Task = mongoose.model('Task',taskSchema);
// module.exports=Task;