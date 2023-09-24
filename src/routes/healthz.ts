import { Router } from "express";

const router = Router();

router.get("/_healthz", (_, res) => {
    res.send({msg: "I'm ok"});
});

export default router;
