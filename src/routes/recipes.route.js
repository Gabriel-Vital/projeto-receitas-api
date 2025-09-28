const express = require("express");
const {getAllRecipes, createNewRecipe} = require('../controllers/recipe.controller')
const {updateRecipe} = require('../controllers/updateRecipe.controller')
const {deleteRecipe} = require('../controllers/deleteRecipe.controller')
const middlewareValidate = require('../middlewares/validate')

const router = express.Router();

router.get("/recipes", middlewareValidate, getAllRecipes)

router.post('/recipes', middlewareValidate, createNewRecipe)

router.put("/recipes/:id", middlewareValidate, updateRecipe)

router.delete('/recipes/:id', middlewareValidate, deleteRecipe)

module.exports = router
