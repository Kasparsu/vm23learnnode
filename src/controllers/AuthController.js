import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs"
import db from '../../models/index.js';


router.get("/register", (req, res) => {
    res.render("auth/register.njk");
});

router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: hash
    };
    await db.User.create(data);
    res.redirect('/login');
});

router.get("/login", (req, res) => {
    res.render("auth/login.njk");
});

router.post("/login", async (req, res) => {
    const user = await db.User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(user && bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user;
        req.session.save();
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    req.session.save();
    res.redirect('/');
});

export default router;