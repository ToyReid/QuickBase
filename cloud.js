const {Storage} = require('@google-cloud/storage');
var io = require('socket.io').listen(80); // initiate socket.io server

const storage = new Storage;

const bucketName = 'quickbase-bucket';
const filename = '/Users/Toy_Reid/testfile.txt';

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' }); // Send data to client
	
	// wait for the event raised by the client
	socket.on('new color', function (data) {  
	  	//console.log(data);
	  	storage
			.bucket(bucketName)
			.upload(filename, {
				// Support for HTTP requests made with `Accept-Encoding: gzip`
				gzip: true,
				metadata: {
				// Enable long-lived HTTP caching headers
				// Use only if the contents of the file will never change
				// (If the contents will change, use cacheControl: 'no-cache')
				cacheControl: 'public, max-age=31536000',
				},
			})
			.then(() => {
				console.log(`${filename} uploaded to ${bucketName}.`);
			})
			.catch(err => {
				console.error('ERROR:', err);
			});
	});
});

