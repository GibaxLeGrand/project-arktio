import {Router} from "express";
import {getUser, putUser, Users} from "../../bdd";
import {hash_password, validate_password} from "../../scripts/security/password";

const router = Router();


router.post("/login", async (req, res) => {
    const [email, password] = [req.body.email, req.body.password]

    // Verify if the user exists
    const user = await getUser(email)

    // If it exists
    if (user && validate_password(password, user.user_password)) {
        // init session data
        req.session.user = {userId: user.user_id, userName: user.user_name};
        res.json({connected: true});
        return;
    }

    // If the user doesn't exist
    res.json({connected: false, error: "Invalid credentials."});
});

router.post("/register", async (req, res) => {
    const [username, email, password, confirm_password] = [req.body.name, req.body.email, req.body.password, req.body.confirm_password]

    // Test if both passwords are the same
    if (password.length < 7) {
        res.json({registered: false, error: "Password must be at least 7 characters long."})
        return;
    }

    if (password !== confirm_password) {
        res.json({registered: false, error: "Both password doesn't match."})
        return;
    }

    // Test if the email address is valid
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        res.json({registered: false, error: "Email is invalid."})
        return;
    }

    // Try to insert user in database
    const user = await putUser(username, email, hash_password(password));

    // User inserted
    if ((user instanceof Users)) {
        res.json({registered: true, message: "Account successfully created !"})
        return;
    }

    // Can't insert user in database for some reasons
    res.json({registered: false, error: user.errors[0]})
})

router.get("/isAuth", async (req, res) => {
    res.json({authenticated: req.session.user != null})
});

router.get("/getUser", async (req, res) => {
    res.json(req.session.user || {error: "Not authenticated."})
})

router.post("/disconnect", (req, res) => {
    // End session
    req.session.destroy(() => {
    });
    res.json({disconnected: true})
})

export default router;