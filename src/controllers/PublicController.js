import { Router } from "express";
const router = Router();
import db from '../../models/index.js';


router.get("/", async (req, res) => {
    const movies = await db.Movie.findAll();
    res.render("index.njk", { movies });
});

router.get("/about", (req, res) => {
  res.render("about.njk");
});

router.get("/form", (req, res) => {
  res.render("form.njk");
});

router.get("/answer", (req, res) => {
  res.render("answer.njk", req.query);
});

router.get("/square", (req, res) => {
  res.render("square.njk");
});

router.get("/squareanswer", (req, res) => {
  let a = req.query.a;
  let answers = {
    a: a,
    S: Math.pow(a, 2),
    P: 4 * a,
    V: Math.pow(a, 3),
  };
  res.render("squareanswer.njk", answers);
});

export default router;