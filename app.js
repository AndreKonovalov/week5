const { log } = console;

const myID = 'id319887435';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' , ...CORS };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' , ...CORS };
log('htxt ' + JSON.stringify(htxt));

export default function initApp(ex, bodyParser, createReadStream, crypto, http) {
	const app = ex();
	app
		.all('/login', (req, res) => {
			log('/login ' + req.method);
			res.status(200)
				.set(hhtml)
				.send(myID);
		})
		.all('/code', (req, res) => {
			log('/code ' + req.method + ' ' +import.meta.url);
			res.status(200)
				.set(htxt)
			let readStream = createReadStream(import.meta.url.slice(7));
			readStream.on('open', function () {
				log('/code ' + 'open');
				readStream.pipe(res);
			});
			readStream.on('error', function(err) {
				res.end(err);
			});
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

