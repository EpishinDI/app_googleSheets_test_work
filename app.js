// --------------server start----------
let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

let app = express();
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'pug');



let port = 3001;

MongoClient.connect('mongodb://localhost:27017/myapi', { useNewUrlParser: true }, (err, database)=>{
	if(err){
		return console.log(err);
	}
	
	db = database.db('repairStudio');;
	app.listen(port,()=>{
	console.log('Node start in: '+port);
})
	
})


//-------------Работа с googlesheets start-----------
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./client_secret.json');

async function accessSpreadsheet() {
	const doc = new GoogleSpreadsheet('1F_tXXdFUO60xfF4kX5qmSWA-gxq_BM39D6VEMmoStKA');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];
	let dataArr = [];

	const rows = await promisify(sheet.getRows)({
		offset: 1
	});

	rows.forEach(row => {
		let date = new Date()
		let dateNow = date.getDate() + '.' + Number(date.getMonth() + 1) + '.' + date.getFullYear()

		let prorab = {
			name: `${row.прораб}`,
			startWork: `${row.датаприеманаработу}`,
			endWork: `${row.датаувольнения}`,
			bedОrders: `${row.количествослетов}`,
			goodОrders: `${row.количествоуспешныхобъектов}`,
			dateАdded: dateNow
		};
		dataArr.push(prorab);
	})
	let promise = new Promise((resolve, reject) => {
		db.collection('Foremans').insertMany(dataArr, (err, result) => {
			if (err) {
				reject('Не удается добавить документ:  ', err)
				throw err
			}
			resolve(result);
		})
	})
	return promise;

}


function delData() {
	let promise = new Promise((resolve, reject) => {
		db.collection('Foremans').drop((err, result) => {
			if (err) {
				reject('Не удается удалить коллекцию:  ', err)
				throw err
			}
			resolve(result);
		})
	});

	return promise;
}


app.get('/', (req, res) => {
	res.render('main');
});


app.get('/getData', (req, res) => {

	delData()
		.then(
			(result) => {
				console.log('1');
				return accessSpreadsheet();
			},
			(reject) => {
				console.log(reject);
				res.sendStatus('500');
			})
		.then(
			(result) => {
				res.send(result);
			},
			(reject) => {
				console.log(reject);
				res.sendStatus('500');
			})

})