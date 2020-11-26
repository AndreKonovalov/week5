const { log } = console;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' };

export default function initApp(ex) {
	const app = ex();
	app
		.get('/', (req, res) => {
			log('get/');
			res.status(200)
				.set({ hhtml, ...CORS })
				.send('Hello World!');
		})
		.all('/ru', (req, res) => {
			log('all/ru');
				res.status(200)
				.set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
				.send('<h1><i>Yes</i></h1>\n'); 
		})
		.all('*', (req, res) => {
			log('Not found');
				res.status(404)
				.set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
				.send('<h1><i>Not found</i></h1>\n'); 
		})
	return app;
}

