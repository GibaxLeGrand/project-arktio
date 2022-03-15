import {Router} from "express"
import sessionApi from "./Api/sessionApi";

const router = Router();

router.use("/session", sessionApi);

export default router;
