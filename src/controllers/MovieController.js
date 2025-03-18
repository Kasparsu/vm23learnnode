import { Sequelize, DataTypes } from 'sequelize';

import { Router } from "express";
const router = Router();
import db from '../../models/index.js';


router.use('/movies', (req, res, next) => {
  if(req.session.user){
    next();
  } else {
    res.redirect('/login');
  }
});

router.get("/movies", async (req, res) => {
  let movies = await db.Movie.findAll();

  res.render("movies/index.njk", { movies });
});

router.get("/movies/create", async (req, res) => {
  res.render("movies/create.njk");
});

router.post("/movies", async (req, res) => {
  await db.Movie.create(req.body);
  res.redirect("/movies");
});

router.get("/movies/view", async (req, res) => {
  let movie = await db.Movie.findByPk(req.query.id);
  res.render("movies/view.njk", { movie });
});

router.get("/movies/edit", async (req, res) => {
  let movie = await db.Movie.findByPk(req.query.id);
  res.render("movies/edit.njk", { movie });
});

router.post("/movies/edit", async (req, res) => {
  let movie = await db.Movie.findByPk(req.query.id);
  await movie.update(req.body);
  res.redirect("/movies");
});

router.get("/movies/delete", async (req, res) => {
  let movie = await db.Movie.findByPk(req.query.id);
  await movie.destroy();
  res.redirect("/movies");
});

export default router;