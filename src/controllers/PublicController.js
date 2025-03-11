import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    
    res.render("index.njk", {user: req.session.user});
});

router.get("/about", (req, res) => {
    req.session.userID = 69;
    req.session.save();
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