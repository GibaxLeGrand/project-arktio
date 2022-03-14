import {Router} from "express";
import {getUser} from "../../bdd";

const router = Router();


router.post("/login", async (req, res) => {
        const [email, password] = [req.body.email, req.body.password]
        const user = await getUser(email, password)
        if (user) {
            req.session.user = {userId: user.user_id, userName: user.user_name};
            res.json({connected:true});
            return;
        }
        res.json({connected:false});
    });

router.get("/isAuth", async (req, res) => {
    res.json({authenticated: req.session.user != null})
});

router.get("/getUser", async (req, res) => {
    res.json(req.session.user || {})
})

router.post("/disconnect", (req, res) => {
    req.session.destroy(()=>{});
    res.json({disconnected:true})
})

export default router;