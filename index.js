const app = require('express')();
const { log } = console;
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' };

let port = 80;
//const app = x();

app
  .get('/', (req, res) => {
	log('get/');
        res
        .status(200)
        .set({ hhtml, ...CORS })
		.send('Hello World!');
	})
  .all('/ru', (req, res) => {
	log('all/ru');
        res
        .status(200)
        .set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
        .send('<h1><i>Yes</i></h1>\n'); 
  })
  .listen(process.env.PORT || port, () => log('process.pid ' + process.pid + ' port=' + process.env.PORT));

