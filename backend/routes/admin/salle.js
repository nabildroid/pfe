import express from "express";
import { getSalles } from "../../models/salles";
const router = express.Router();

router.get("/", (req, res) => {
    const salles = getSalles();
    res.render("salles", { salles });
});

router.get("/new", (req, res) => {
    res.render("salles");
});

router.post("/", (req, res) => {
    const { name } = req.body;
});

export default router;
