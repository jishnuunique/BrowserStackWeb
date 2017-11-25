/**
 * 
 */


/**
 * 
 */
var fs = require('fs');
var fs = require('fs'),
	bite_size = 256,
	readbytes = 0,
    file;
path = require('path'),    
filePath = path.join(__dirname, 'test_log.log');
var data_ = ""

var express = require('express');
// var multer = require('multer');

//set an instance of exress
app = express();
var http    = require('http').Server(app);
var io      = require('socket.io')(http);
flag = false


function get_last_ten_line(s)
{
	var s_arr = s.split("\n");
	var len = s_arr.length;
	var count = 0;
	var st = [];
	for(var i =len-1;i>=0;i--)
	{
		st.push(s_arr[i]);
		count+=1;
		if(count==9){
			break;
		}
		st.push("\n");

	}

	console.log(st.toString());
	len = st.length;

	var rev_st = "";
	for (var i=len-1;i>=0;i--){
		rev_st+=st[i];
	}


	return rev_st;
}
	



function tail_file(){



	function processsome(err, bytecount, buff) {
    console.log('Read', bytecount, 'and will process it now.');

    // Here we will process our incoming data:
        // Do whatever you need. Just be careful about not using beyond the bytecount in buff.
        
        var data = buff.toString('utf-8', 0, bytecount);
        data_ += data

        if(flag == false){
        	data = get_last_ten_line(data);
        	console.log(data+flag.toString());
        	starting_string = data;
        	
        	flag = true
        	io.emit('first req',{message:get_last_ten_line(data)});
        	// res.send(data + flag.toString());
   		 }
        
  //       res.write(buff.toString('utf-8', 0, bytecount));
		// res.write(buff.toString('utf-8', 0, bytecount));
		// res.end()
		// else{
		// 	data = starting_string+data;
		// 	data = get_last_ten_line(data,flag)

			//console.log(data+flag.toString());
			else{
			io.emit('update req',{message:data});
			console.log(data+flag.toString());
		}
			// (data)


//...
		//response.end()

    // So we continue reading from where we left:
    readbytes+=bytecount;
    process.nextTick(readsome);
}


	function readsome() {
    var stats = fs.fstatSync(file); // yes sometimes async does not make sense!
    if(stats.size<readbytes+1) {
        console.log('Hehe I am much faster than your writer..! I will sleep for a while, I deserve it!');
        console.log(stats.size);
        console.log(readbytes);
        setTimeout(readsome, 3000);
    }
    else {
    	 //var io = io;
         fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processsome);
        
    }
}

fs.open(filePath, 'r', function(err, fd) { file = fd; readsome(); });
starting_string = ""
//flag = false;


    
};


function Redirect() {
	 this.fun = {flashMe:  function() {
		console.log("Hi Joy! you are redirected here.");
		console.log(get_last_ten_line(data_,false));
		if(flag == true){
		io.emit('first req',{message:get_last_ten_line(data_)});
	}

		// console.log("#### tail request from : "+req.connection.remoteAddress);
		// console.log("!!"+req.file);
		// var tmp_path = req.file.path;
		// console.log(req.file.originalname);

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
//   		var target_path = 'uploads/' + req.file.originalname;
//   		var src = fs.createReadStream(tmp_path);
// 		  var dest = fs.createWriteStream(target_path);
// 		  src.pipe(dest);
// 		  // src.on('end', function() { res.render('complete'); });
// 		  // src.on('error', function(err) { res.render('error'); });
// //		console.log(res);
		 tail_file(io);
	}};
};
//module.exports = Redirect;


var directory = __dirname;
function sayHello(){
	console.log("Hello World!");
}
function sayRedirect(){
	//var Redirect = require(directory+'/Redirect.js');
	var redirect = new Redirect();
	redirect.fun.flashMe();
	// io.emit(resp);
}


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
// io.emit('something happend'); // for all.
// socket.broadcast.emit('something happend',{message:'server 2'}); 
// console.log("fhjs")
sayRedirect();// for all except me.
});
});