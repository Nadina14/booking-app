import express, { urlencoded } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import db from "../utils/db.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.get("/", (req, res) => {
    res.render("layout", {
        page: "home",
        pageTitle: "Homepage"
    });
});

router.get("/registration", (req, res) => {
    res.render("layout", {
        page: "registration",
        pageTitle: "Registration",
        msg: "",
        valori: { nome: "", email: "", username: "" }
    });
});

router.post("/registration", async (req, res) => {
    const { nome, email, username, password } = req.body;
    let error = false;
    if (!validator.isAlpha(nome) || !validator.isLength(nome, { min: 2, max: 50 })) {
        error = true;
    } else if (!validator.isEmail(email)) {
        error = true;
    } else if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 6, max: 50 })) {
        error = true;
    } else if (!validator.isStrongPassword(password)) {
        error = true;
    };
    if (error) {
        return res.render("layout", {
            page: "registration",
            pageTitle: "Registration",
            msg: "Control that all the inputs are correct",
            valori: { nome, email, username }
        });
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const users = { nome, email, username, password: hash };
    const ris = await db.users.insertOne(users);
    res.redirect("/login");
});

router.get("/logout", (req, res) => {
    const cookieSetting = {
        expires: new Date(0),
        httpOnly: true,
        secure: false
    };
    res.cookie("tokenJWT", "", cookieSetting).send("You've been successfully logged out");
});

router.get("/login", (req, res) => {
    res.render("layout", {
        page: "login",
        pageTitle: "Login"
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await db.users.findOne({ username });
    if (user) {
        const passwordCheck = bcrypt.compareSync(password, user.password);
        if (passwordCheck) {
            const payload = { sub: user._id.toString(), isLogged: true };
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
            res.cookie("tokenJWT", token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: false });
            res.redirect("/user/dashboard");
        };
        res.redirect("/login");
    };
    res.send("Controlling login inputs...");
});

router.get("/user/dashboard", checkAuth, (req, res) => {
    res.render("layout", {
        page: "user-dashboard",
        pageTitle: "User Dashboard"
    });
});


export default router;