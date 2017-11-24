/**
 * 
 */

var directory = __dirname;
function sayHello(){
	console.log("Hello World!");
}
function sayRedirect(io){
	var Redirect = require(directory+'/Redirect.js');
	var redirect = new Redirect();
	redirect.fun.flashMe(io);
	// io.emit(resp);
}

var express = require('express');
// var multer = require('multer');

//set an instance of exress
app = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
// var upload = multer({ dest: 'uploads/' });
//require the body-parser nodejs module
//bodyParser = require('body-parser'),
////require the path nodejs module
//path = require("path");

//support parsing of application/json type post data
//app.use(bodyParser.json());
//
////support parsing of application/x-www-form-urlencoded post data
//app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(__dirname));

//buff.toString('utf-8', 0, bytecount)

//app.get('/logs_tail',sayRedirect)

// app.post('/uploads',upload.single('filename'),sayRedirect);

http.listen(3000, function () {
	  console.log('Server is running. Point your browser to: http://localhost:3000');
	});

io.on('connection',function(socket){
	console.log("connected");

	io.emit("connected",{message: 'server'});

// This event will trigger when any user is connected.
// You can use 'socket' to emit and receive events.
socket.on('logs_tail',function(data){
// When any connected client emit this event, we will receive it here.
io.emit('something happend'); // for all.
socket.broadcast.emit('something happend',{message:'server 2'}); 
console.log("fhjs")
sayRedirect(io);// for all except me.
});
});