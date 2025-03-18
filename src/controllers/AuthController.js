import { Sequelize, DataTypes } from 'sequelize';

import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs"

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const User = db.define('User', {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
},
{
  timestamps: false
});


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
    await User.create(data);
    res.redirect('/login');
});

router.get("/login", (req, res) => {
    res.render("auth/login.njk");
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({
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