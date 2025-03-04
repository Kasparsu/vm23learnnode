import express from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import { Sequelize, DataTypes } from 'sequelize';
const app = express();
const port = 3000;

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const Movie = db.define('Movie', {
  name: DataTypes.TEXT,
  length: DataTypes.INTEGER,
  description: DataTypes.TEXT,
},
{
  timestamps: false
});


app.use(express.urlencoded());

nunjucks.configure('views', {
  autoescape: true,
  express: app
});


app.get('/', (req, res) => {
  res.render('index.njk');
});

app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/form', (req, res) => {
  res.render('form.njk');
});

app.get('/answer', (req, res) => {
    res.render('answer.njk', req.query);
});

app.get('/square', (req, res) => {
  res.render('square.njk');
});

app.get('/squareanswer', (req, res) => {
  let a = req.query.a;
  let answers = {
    a: a,
    S: Math.pow(a, 2),
    P: 4 * a,
    V: Math.pow(a, 3)
  };
  res.render('squareanswer.njk', answers);
});

app.get('/movies', async (req, res) => {
  let movies = await Movie.findAll();
  
  res.render('movies/index.njk', { movies });
});

app.get('/movies/create', async (req, res) => {
  res.render('movies/create.njk');
});

app.post('/movies', async (req, res) => {
  await Movie.create(req.body);
  res.redirect('/movies');
});

app.get('/movies/view', async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  res.render('movies/view.njk', { movie });
});

app.get('/movies/edit', async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  res.render('movies/edit.njk', { movie });
});

app.post('/movies/edit', async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  await movie.update(req.body);
  res.redirect('/movies');
});

app.get('/movies/delete', async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  await movie.destroy();
  res.redirect('/movies');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});