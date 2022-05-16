import {Router} from "express";
import {getUser, putUser, Users, ConstraintViolationError, DBError, NotFoundError, getUserAuthentificate} from "../../bdd";
import {hash_password, validate_password} from "../../scripts/security/password";

const router = Router();


router.post("/login", async (req, res) => {
    const [email, password] = [req.body.email, req.body.password]

    if (!email || !password) {
        res.status(400).json({error: "Missing parameters"})
        return
    }

    // Verify if the user exists
    try {
        const user = await getUserAuthentificate(email);
        // If it exists
        if (validate_password(password, user.user_password)) {
            // init session data
            req.session.user = {userUUID: user.user_uuid, userName: user.user_name};
            res.json({connected: true});
            return;
        }
    } catch (err) {
        // If the user doesn't exist
        if (err instanceof NotFoundError) {
            res.json({connected: false, error: "Invalid credentials."});
        } else {
            res.json({connected: false, error: "Unknown error!"});
        }
    }
});

router.post("/register", async (req, res, next) => {
    const [username, email, password, confirm_password] = [req.body.name, req.body.email, req.body.password, req.body.confirm_password]

    if (!username || !email || !password || !confirm_password) {
        res.status(400).json({error: "Missing parameters"})
        return
    }

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
    try {
        const user = await putUser(username, email, hash_password(password));
        console.log(user);
        // User inserted
        res.json({registered: true, message: "Account successfully created!"})   
    } catch (err) {

        if (err instanceof ConstraintViolationError) {
            // Can't insert user in database for some reasons
            res.json({registered: false, error: "Account already exist!"})
        } else if (err instanceof DBError) {
            res.json({registered: false, error: "Cannot connect to database!"})
        }
    }
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