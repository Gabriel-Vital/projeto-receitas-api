const express = require("express");
const {getAllRecipes, createNewRecipe} = require('../controllers/recipe.controller')
const middlewareValidate = require('../middlewares/validate')

const router = express.Router();

router.get("/recipes", getAllRecipes)

router.post('/recipes', createNewRecipe)

module.exports = router
