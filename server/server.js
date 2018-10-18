const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http')
const socketIO = require('socket.io')


const { Users } = require('./utils/users');
var users = new Users();
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});

var currentTime = 0;

io.on('connection',function(socket){

  socket.on('join', (params, callback) => {
    socket.join(params.channel);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.channel);
    io.to(params.channel).emit('updateUserList', users.getUserList(params.channel));
    callback();
  });


    console.log("New user connected");
    socket.on('disconnect',function(){
        console.log("A User disconnected")
    });
    socket.on('newTime',function(syncTimeReceived){
      var user = users.getUser(socket.id);
      if(syncTimeReceived.newTime>0){
        console.log(`Setting new time across all ${user.channel} users`);
        currentTime = syncTimeReceived.newTime;
        io.to(user.channel).emit('syncTime',{
          time: currentTime
        });
      }
    });

    socket.on('play',function(){
      var user = users.getUser(socket.id);
      console.log(`Playing video across the ${user.channel}users`);
      io.to(user.channel).emit('play');
    });

    socket.on('pause',function(){
      var user = users.getUser(socket.id);
      console.log(`Pausing video across the ${user.channel}users`);
      io.to(user.channel).emit('pause');
    });

    

});
