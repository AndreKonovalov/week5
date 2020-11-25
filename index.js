const [{ Server: h1 }, x] = [require('http'), require('express')];

const { log } = console;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE'
//  'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};
const hhtml = { 'Content-Type': 'text/html; charset=utf-8' };
const htxt = { 'Content-Type': 'text/plain; charset=utf-8' };

let port = 80;
const app = x();

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
  .listen(process.env.PORT || PORT, () => log('process.pid ' + process.pid));
//	process.env.PORT || port, () => {  console.log(`Example app listening at http://:${port}`)})

/*app
  .all('/doc/new/vasya-new.htm', (req, res) => {
        res
        .send('<h1><i>Vasya Web Page</i></h1>\n');
  })
  .all('/download', (req, res) => {
        res
        .status(200)
        .set({ 
         'Content-Disposition': 'attachment; filename="file.txt"'
        })
        .send('File\n'); 
  })
  .use((req, res) => {
        res
        .status(404)
        .set({ 'Content-Type': 'text/html; charset=utf-8', ...CORS })
        .send('<h1><i>Не найдено!</i></h1>\n');    
  })
  .listen(4321);
*/

