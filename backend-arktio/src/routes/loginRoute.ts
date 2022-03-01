import {Router} from "express";

let router = Router();

router.get("/", (req, res) => {
    res.send("Login Route Get <br/><form method='post'> <button type='submit'>TEST</button> </form>");
}).post("/", (req, res) => {
    res.send("Login route Post<br/><a href=''>Return to get</a>");
});

export default router;