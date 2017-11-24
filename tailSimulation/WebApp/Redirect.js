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



function get_last_ten_line(s,flag)
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
	



function tail_file(io){



	function processsome(err, bytecount, buff,io) {
    console.log('Read', bytecount, 'and will process it now.');

    // Here we will process our incoming data:
        // Do whatever you need. Just be careful about not using beyond the bytecount in buff.
        
        var data = buff.toString('utf-8', 0, bytecount);

        if(flag == false){
        	data = get_last_ten_line(data,flag);
        	console.log(data+flag.toString());
        	starting_string = data;
        	flag = true
        	// res.send(data + flag.toString());
   		 }
        
  //       res.write(buff.toString('utf-8', 0, bytecount));
		// res.write(buff.toString('utf-8', 0, bytecount));
		// res.end()
		// else{
		// 	data = starting_string+data;
		// 	data = get_last_ten_line(data,flag)
			console.log(data+flag.toString());
			// (data)


//...
		//response.end()

    // So we continue reading from where we left:
    readbytes+=bytecount;
    process.nextTick(readsome);
}


	function readsome(io) {
    var stats = fs.fstatSync(file); // yes sometimes async does not make sense!
    if(stats.size<readbytes+1) {
        console.log('Hehe I am much faster than your writer..! I will sleep for a while, I deserve it!');
        setTimeout(readsome, 3000);
    }
    else {
    	 var io = io;
         fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processsome);
        
    }
}

fs.open(filePath, 'r', function(err, fd) { file = fd; readsome(); });
starting_string = ""
flag = false;


    
};


function Redirect() {
	 this.fun = {flashMe:  function(io) {
		console.log("Hi Joy! you are redirected here.");
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
module.exports = Redirect;