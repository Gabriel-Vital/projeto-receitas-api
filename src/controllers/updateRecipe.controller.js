const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      cookTime,
      difficulty,
      rating,
      category,
      ingredients,
      instructions,
    } = req.body;

    const existingRecipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!existingRecipe) {
      res.status(404).json({ error: "Receita não encontrada." });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        image,
        cookTime,
        difficulty,
        rating,
        category,
        ingredients,
        instructions,
      },
    });

    res.status(200).json(updatedRecipe)
  } catch (error) {
    console.error(error)
    res.status(404).json({error: error})
  }
};

module.exports = {updateRecipe}
