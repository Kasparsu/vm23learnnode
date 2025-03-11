import { Sequelize, DataTypes } from 'sequelize';

import { Router } from "express";
const router = Router();


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



router.get("/movies", async (req, res) => {
  let movies = await Movie.findAll();

  res.render("movies/index.njk", { movies });
});

router.get("/movies/create", async (req, res) => {
  res.render("movies/create.njk");
});

router.post("/movies", async (req, res) => {
  await Movie.create(req.body);
  res.redirect("/movies");
});

router.get("/movies/view", async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  res.render("movies/view.njk", { movie });
});

router.get("/movies/edit", async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  res.render("movies/edit.njk", { movie });
});

router.post("/movies/edit", async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  await movie.update(req.body);
  res.redirect("/movies");
});

router.get("/movies/delete", async (req, res) => {
  let movie = await Movie.findByPk(req.query.id);
  await movie.destroy();
  res.redirect("/movies");
});

export default router;