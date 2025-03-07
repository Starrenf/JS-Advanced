'use strict';
fetch("./cake-recipes.json", { cache: "no-cache" })

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")(); 

const getUniqueValues = (array) => [...new Set(array)];


const showAllAuthors = () => {
  const authors = getUniqueValues(cakeRecipes.map(recipe => recipe.author));
  console.log("\nAuthors:\n" + authors.join("\n"));
};


const showRecipesByAuthor = () => {
  const author = prompt("Enter the author's name: ");
  const recipes = cakeRecipes.filter(recipe => recipe.author === author);
  
  recipes.length 
    ? console.log(`\nRecipes by ${author}:\n${recipes.map(r => r.name).join("\n")}`)
    : console.log("No recipes found for this author.");
};


const showRecipesByIngredient = () => {
  const ingredient = prompt("Enter an ingredient: ").toLowerCase();
  const recipes = cakeRecipes.filter(recipe =>
    recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredient))
  );

  recipes.length
    ? console.log(`\nRecipes with '${ingredient}':\n${recipes.map(r => r.name).join("\n")}`)
    : console.log("No recipes found with this ingredient.");
};


const getRecipeByName = () => {
  const recipeName = prompt("Enter the recipe name: ");
  const recipe = cakeRecipes.find(recipe => recipe.name === recipeName);

  if (recipe) {
    console.log(`\nRecipe: ${recipe.name}\nAuthor: ${recipe.author}\nIngredients:`);
    recipe.ingredients.forEach(ing => console.log(`- ${ing}`));
    console.log("\nInstructions:\n" + recipe.instructions);
  } else {
    console.log("Recipe not found.");
  }
};


const getAllIngredients = () => {
  const allIngredients = getUniqueValues(cakeRecipes.flatMap(recipe => recipe.ingredients));
  console.log("\nAll Ingredients:\n" + allIngredients.join("\n"));
};


const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  return parseInt(prompt("Enter a number (0-5): "), 10);
};


let choice;
do {
  choice = displayMenu();

  const actions = {
    1: showAllAuthors,
    2: showRecipesByAuthor,
    3: showRecipesByIngredient,
    4: getRecipeByName,
    5: getAllIngredients
  };

  actions[choice] ? actions[choice]() : console.log("Invalid input. Please enter a number between 0 and 5.");
} while (choice !== 0);

console.log("Exiting...");

''