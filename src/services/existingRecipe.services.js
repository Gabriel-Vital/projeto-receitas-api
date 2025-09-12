const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

const existingRecipe = async (id, res) => {
  const existingRecipe = await prisma.recipe.findUnique({
      where: { id },
  });

}

module.exports = existingRecipe
