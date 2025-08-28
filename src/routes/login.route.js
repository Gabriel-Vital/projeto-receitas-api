const express = require("express");
const jwt = require("jsonwebtoken");
const middlewareValidate = require("../middlewares/validate");
const { PrismaClient } = require("../../generated/prisma");
const findUserByEmail = require("../services/user.services");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const router = express.Router();

router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      "secret_key",
      { expiresIn: "2h" }
    );

    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
    throw new Error("Falha ao registrar");
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).send("Credenciais inválidas");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send("Senha incorreta. Tente novamente.")
    }

    const {password: _, ...userWithoutPassword} = user

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "secret_key",
      { expiresIn: "2h" }
    );

    return res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    return res.status(500).json({error: error})
  }
});

module.exports = router;
