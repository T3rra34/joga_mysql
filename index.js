const express = require('express')
const app = express()

const path = require('path')
const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view-engine', 'hbs');
app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
}))

app.use(express.static('public'));

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

var con = mysql.createconnection({
	host: "localhost",
	user: "root",
	password: "qwerty",
	database: "joga_mysql"
})

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to joga_mysql database");
})

app.get('/', (req, res) => {
	let query = "Select * FROM article";
	let articles = []
	con.query(query, (err, result) => {
		if(err) throw err;
		articles = result
		console.log(articles)
	})
	res.render('index')
});

app.get('/article/:slug', (req, res) => {
	let query = `Select * FROM article Where slug="${req.params.slug}"`
	let article
	con.query(query, (err, result) => {
		if(err) throw err;
		article = result
		console.log(article)
		res.render('article', {
			article: article
		})
	});
});
app.get('/', (req, res) => {
	let query = 'Select name FROM author'
	let author
	con.query(query, (err, result) =>{
		author = result
		console.log(author)
		res.render('author', {
			author: author
		})
	});
});

app.listen(3215, () => {
	console.log('App is started at http://localhost:3215');
});