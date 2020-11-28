const myID = 'id319887435';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' , ...CORS };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' , ...CORS };

export default function initApp(ex, bodyParser, createReadStream, crypto, http) {
	const app = ex();
	app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())
		.all('/login', (req, res) => res.status(200).set(hhtml).send(myID))
		.all('/code', (req, res) => {
			res.status(200).set(htxt);
			let readStream = createReadStream(import.meta.url.slice(7));
			readStream.on('open', () => readStream.pipe(res));
			readStream.on('error', (err) => res.end(err));
		})
		.all('/sha1/:n1', (req, res) => {
			res.status(200).set(htxt)
			   .send(crypto.createHash('sha1').update(req.params.n1).digest('hex'));
		})
		.all('/req', (req, res) => {
			let addr;
			if(req.method === 'GET')
				addr = req.url.slice(req.url.indexOf('?') + 6);
			else if(req.method === 'POST')
				addr = req.body.addr;
			else { res.end('Unknown method\n'); return; }
			res.status(200).set(hhtml);
			http.get(addr, (rs) => {
  				const { statusCode } = rs;
  				if (statusCode !== 200) res.end('Request Failed.\n' + `Status Code: ${statusCode}\n`);
  				else rs.pipe(res);
			}).on('error', (e) => res.end(`Got error: ${e.message}\n`));
		})
		.all('*', (req, res) => res.status(200).set(hhtml).send(myID));
	return app;
}

