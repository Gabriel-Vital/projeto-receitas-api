const {PrismaClient} = require('../../generated/prisma')

const prisma = new PrismaClient()

const createNewRecipe = async (req, res) => { 
  try {
    const {
      id,
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

    const recipe = await prisma.recipe.create({  
      data: {
        id,
        title,
        description,
        image,
        cookTime,
        difficulty,
        rating,
        category,
        ingredients,
        instructions,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    
    
    return res.status(201).json(recipe);
  } catch (error) {
    console.error(error)
    return res.status(401).json({error: error})
  }
  
};

const getAllRecipes = async (req, res) => {
  let recipes = await prisma.recipe.findMany()
  res.status(200).json(recipes);
};

module.exports = { createNewRecipe, getAllRecipes };