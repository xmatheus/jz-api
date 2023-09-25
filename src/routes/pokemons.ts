import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { STATUS_CODE } from "../middlewares/error-handler";

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query"] : ["error"],
});

const router = Router();

router.post("/pokemons", async (req, res) => {
  const { tipo, treinador } = req.body;

  if (!tipo || !treinador) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({ msg: "missing params" });
  }

  const pokemon = await prisma.pokemon.create({
    data: {
      tipo,
      treinador,
    },
  });
  res.json(pokemon);
});

export default router;
