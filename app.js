const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const Routes = require('./routes/chat_routes');

const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const dbURI = "mongodb://localhost:27017";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => server.listen(3000))
  .catch(err => console.log(err));

app.set('view engine','ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });
io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

// io.on('joined-user',(data)=>{
   
// })
require('./utils/socket')(io);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// task routes
app.use('/', Routes);



app.use((req, res) => {  //fires for every single request|| functions invocs only if express dont find any url matchs above
  res.status(404).render('404', { title: '404' });
});