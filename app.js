const myID = 'id319887435';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
// 'Access-Control-Allow-Headers': 'x-test, Content-Type, Accept, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' , ...CORS };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' , ...CORS };

export default function initApp(ex, bodyParser, createReadStream, crypto, http, mongoose, User) {
	const app = ex();
	app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())
		.all('/login/', (req, res) => res.status(200).set(hhtml).send(myID))
		.all('/code/', (req, res) => {
			res.status(200).set(htxt);
			let readStream = createReadStream(import.meta.url.slice(7));
			readStream.on('open', () => readStream.pipe(res));
			readStream.on('error', (err) => res.end(err));
		})
		.all('/sha1/:n1', (req, res) => {
			res.status(200).set(htxt)
			   .send(crypto.createHash('sha1').update(req.params.n1).digest('hex'));
		})
		.all('/req/', (req, res) => {
			let addr;
			if(req.method === 'GET')
				addr = req.query.addr;
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
		.post('/insert/', async (req, res) => {
    		    const { URL, login, password } = req.body;
		    console.log('URL, login, password ' + URL+' '+ login+' '+ password);
    		    try {
      			await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true });
			const newUser = new User({ login, password });
      			await newUser.save();
      			res.status(201).set(hhtml).send(`User was saved with login ${login}`);
    		    } catch (e) {
      			res.status(400).set(hhtml).send(e.codeName);
    		    }
  		})
		.all('*', (req, res) => res.status(200).set(hhtml).send(myID));
	return app;
}

