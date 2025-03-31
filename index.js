//  versie 31 03 25
'use strict';
const prompt = require("prompt-sync")();
const cakeRecipes = require("./cake-recipes.json");
let savedIngredients = [];

//  Unieke authors
const getUniqueAuthors = (recipes) => {
  let authors = [];
  recipes.forEach(({ Author }) => {
    if (!authors.includes(Author)) {
      authors.push(Author);
    }
  });
  return authors;
};

//  Log recepten namen
const logRecipeNames = (recipes) => {

  if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => console.log(Name));
};

// Recepten per author
const getRecipesByAuthor = (recipes, author) => {



  const varia = recipes.filter(recipe => recipe.Author === author);

 

      return varia
};

// FRecepten per ingredient
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe => recipe.Ingredients.some(ing => ing.includes(ingredient)));
};
// Recepten per naam
const getRecipeByName = (recipes, name) => {
  return recipes.find(recipe => recipe.Name.includes(name));
};

const getAllSavedIngredients = (recipes) => {

  recipes.forEach(ingredient => console.log(ingredient));

};
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;
do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log("Unique authors:", getUniqueAuthors(cakeRecipes));
      break;
    case 2:
      const author = prompt("Enter author's name: ");
      logRecipeNames(getRecipesByAuthor(cakeRecipes, author));
      break;
    case 3:
      const ingredient = prompt("Enter ingredient: ");
      logRecipeNames(getRecipesByIngredient(cakeRecipes, ingredient));
      break;
    case 4:
      const name = prompt("Enter recipe name: ");
      const recipe = getRecipeByName(cakeRecipes, name);
      if (recipe) {
        console.log(recipe);
        const save = prompt("Save ingredients? (yes/no): ");
        if (save.toLowerCase() === "yes") {
          savedIngredients.push(...recipe.Ingredients);
        }
      } else {
        console.log("Recipe not found.");
      }
      break;
    case 5:
     getAllSavedIngredients(savedIngredients );
      break;
    case 0:4
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
