const express = require("express");
const {getAllRecipes, createNewRecipe} = require('../controllers/recipe.controller')
const {deleteRecipe} = require('../controllers/deleteRecipe.controller')
const middlewareValidate = require('../middlewares/validate')

const router = express.Router();

router.get("/recipes", getAllRecipes)

router.post('/recipes', createNewRecipe)

router.delete('/recipes/:id', deleteRecipe)

module.exports = router
