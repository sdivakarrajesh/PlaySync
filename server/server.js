const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});

app
  .set('views', path.join(__dirname, '../views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))

var currentTime = 0;
io.on('connection',function(socket){
    console.log("New user connected");
    socket.on('disconnect',function(){
        console.log("A User disconnected")
    });
    socket.on('newTime',function(syncTimeReceived){
      if(syncTimeReceived.newTime>0){
        console.log("Setting new time across all users");
        currentTime = syncTimeReceived.newTime;
        io.emit('syncTime',{
          time: currentTime
        });

      }

    });

});
