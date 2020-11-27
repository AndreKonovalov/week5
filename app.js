const { log } = console;

const myID = 'id319887435';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' , ...CORS };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' , ...CORS };
log('htxt ' + htxt);

export default function initApp(ex, bodyParser, createReadStream, crypto, http) {
	const app = ex();
	app
		.all('/login', (req, res) => {
			log('/login ' + req.method);
			res.status(200)
				.set(htxt)
				.send(myID);
		})
		.all('/code', (req, res) => {
			log('/code ' + req.method + ' ' +import.meta.url);
			let filename = __dirname+req.url;
			log('/code ' + filename);

			// This line opens the file as a readable stream
			let readStream = createReadStream(filename);

			// This will wait until we know the readable stream is actually valid before piping
			readStream.on('open', function () {
				// This just pipes the read stream to the response object (which goes to the client)
					readStream.pipe(res);
				});

				// This catches any errors that happen while creating the readable stream (usually invalid names)
			readStream.on('error', function(err) {
				res.end(err);
			});

				res.status(200)
				.set({ 'Content-Type': 'text/plain; charset=utf-8', ...CORS })
				.send(import.meta.url.substring(7)); 
		})
		.all('/sha1', (req, res) => {
			log('/sha1 ' + req.method);
				res.status(200)
				.set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
				.send(); 
		})
		.all('/req', (req, res) => {
			log('/req ' + req.method);
				res.status(200)
				.set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
				.send(); 
		})
		.all('*', (req, res) => {
			log('Not found ' + req.url + ' ' + req.method);
				res.status(404)
				.set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
				.send('<h1><i>Not found</i></h1>\n'); 
		});
	return app;
}


