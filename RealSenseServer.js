var PythonShell = require('python-shell');
var express   = require("express");
var app         = express();
var port        = 1337;
var mraa = require("mraa");
var pins2 = new mraa.Gpio(2);
        pins2.dir(mraa.DIR_OUT);

var socket = require('socket.io-client')('http://10.0.0.190:1337');

app.use(express.static(__dirname + '/'));
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.on('connection', function(socket){
  'use strict';
  console.log('a user connected from ' + socket.request.connection.remote

        // Check realsense signal
        socket.on('realsense_signal', function(data){
        socket.broadcast.emit('realsense_signal', data);
        console.log('Face Signal: ' + data.name);
        if(data.name == 'spreadfingers' ){
                 // pins2.write(1);
                PythonShell.run('LED.py',function(err){
                        if (err) throw err;
                        console.log('finished');
                });
        } else {
                pins2.write(0);
        }
        });
  socket.on('disconnect',function(){
        console.log('user disconnected');
  });
});

