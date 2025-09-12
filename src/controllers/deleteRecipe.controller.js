const { PrismaClient } = require("../../generated/prisma");
const existingRecipe = require("../services/existingRecipe.services");

const prisma = new PrismaClient();

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const existRecipe = existingRecipe(id, res);

    if (!existRecipe) {
      res.status(401).json({ error: "Receita não encontrada" });
    }

    const deletedRecipe = await prisma.recipe.delete({
      where: { id },
    });
    res.status(200).json(deletedRecipe);
  } catch (error) {
    console.error(error)
    res.status(403).json({error: error})
  }
};

module.exports = {deleteRecipe}