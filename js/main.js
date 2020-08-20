////////////////////////////////////////// global variables //////////////////////////////////////////
var cssFile = "css/color-dark.css";

var initialGameState = {
  stamina: 5,
  staminaCap: 10,
  wood: 0,
  food: 0,
  metal: 0,
  trash: 0
};

const testLootTable = {
	wood: [20, 1, 6],
  food: [20, 1, 6],
  metal: [5, 1, 3],
	trash: [5, 1, 3]
};

var backlog = "You are stranded on an island in the Pacific.";

// copying values of initial game state
// simple = won't work cause js is doing referencing instead of copying
// here we doing a deep copy
// more details in the link
// https://stackoverflow.com/questions/18829099/copy-a-variables-value-into-another
var gameState = JSON.parse(JSON.stringify(initialGameState));

var modifiers = {
  restStamina: 2,
  actionStamina: -1,
  gatherWood: 5,
};

////////////////////////////////////////// game loop //////////////////////////////////////////
window.setInterval(function(){
  if (gameState.stamina < 0){
    gameOver("Jade died of exhaustion.");
    updateBacklog("You lost all your progress.");
  }
	save();
}, 1000);

////////////////////////////////////////// game logic //////////////////////////////////////////
function restClick(number){
    var stamina = gameState.stamina + modifiers.restStamina*number;
    if (stamina >= gameState.staminaCap){
      updateBacklog('You restored ' + (gameState.staminaCap - gameState.stamina) + " stamina.");
      gameState.stamina = gameState.staminaCap;
    } else {
      gameState.stamina = stamina;
      updateBacklog('You restored ' + modifiers.restStamina*number + " stamina.");
    }
    updateElement('stamina', gameState.stamina);
}

function gatherWoodClick(number){
  gameState.wood = gameState.wood + modifiers.gatherWood*number;
	updateElement('wood', gameState.wood);
	gameState.stamina = gameState.stamina + modifiers.actionStamina*number;
  updateElement('stamina', gameState.stamina);
  updateBacklog('You gathered ' + modifiers.gatherWood*number + " wood.");
}

function salvage(number){
  gameState.stamina = gameState.stamina + modifiers.actionStamina*number;
  updateElement('stamina', gameState.stamina);
  var lootEntry = determineLoot(testLootTable);
  var lootAmount = determineAmount(lootEntry[1]);
  gameState[lootEntry[0]] = gameState[lootEntry[0]] + lootAmount;
  updateElement(lootEntry[0], gameState[lootEntry[0]]);
  updateBacklog('You salvaged ' + lootAmount + " " +  lootEntry[0] + ".");
}

function determineLoot(lootTable){
  //console.log(lootTable);
  var sumsOfWeights = []; //initial array of weights
  var newSum = 0; //making a variable for the new sum of weights
  for (var entry in lootTable) {
    newSum += lootTable[entry][0]; // updating variable
    sumsOfWeights.push(newSum); // appending variable to array
  }
  //console.log(sumsOfWeights);
  var totalWeight = sumsOfWeights[sumsOfWeights.length - 1]; //total weights for all elements of lootTable
  //console.log(totalWeight);
  var randomNumber = Math.floor((Math.random() * totalWeight) + 1);
  //console.log(randomNumber);
  /* .filter() is a method of class Array method which
   returns a new array of elements which pass the given test functions.
   our test function here is
   function(element) {return element < randomNumber;}
   randomNumber acts as a global variable for this function
   so we don't need to pass it to the function as a variable.
   Output of the .filter is an array containing the subset of values
   of original array. we don't really care tho, we just want to know how many,
   so we're calling a .length method on it, which gives us desired id*/
  var id = sumsOfWeights.filter(function(element) {return element < randomNumber;}).length; // id of the loot which character gets
  //console.log(id);

  var lootEntry = Object.entries(lootTable)[id];
  //console.log(lootEntry);

  return lootEntry;
}

function determineAmount(lootArray){ // lootArray = [20, 1, 5], where 20 is probability weight, 1 is minimal value, 5 is maximal value
  var randomNumber = Math.random();
  //console.log(randomNumber);
  var rangeWidth = lootArray[2] - lootArray[1] + 1;
  console.log(rangeWidth);
  var amount = Math.floor((randomNumber * rangeWidth) + lootArray[1]);
  console.log(amount);
  return amount;
}

////////////////////////////////////////// game utility functions //////////////////////////////////////////
function save(){
	localStorage.setItem('gameStateSave',JSON.stringify(gameState));
  localStorage.setItem('cssFileSave',JSON.stringify(cssFile));
}

function load(){
  //reading from save file
  var gameStateSave = JSON.parse(localStorage.getItem('gameStateSave'));
  //looping through the elements of the gameState using their keys
  Object.keys(gameState).forEach(function(key){
      //updating gameState with the values from the gameStateSave
      //if corresponding values are defined
      if (typeof gameStateSave[key] !== 'undefined') gameState[key] = gameStateSave[key];
      //updating html with these values
      updateElement(key, gameState[key]);
    });
  
  //loading saved cssFile
  var cssFileSave = JSON.parse(localStorage.getItem('cssFileSave'));
  if (typeof cssFileSave !== 'undefined') cssFile = cssFileSave; 
  changeCSS(cssFile);
}

function updateElement(id, value){
  document.getElementById(id).innerHTML = prettify(value); 
}

function deleteSave(){
  //localStorage.removeItem('save');
  //people say command is asynchronous and doesn't happen outright which is not what we want, therefore i just update the save with 0 vals
  //i'm sure there is a more elegant solution, but for now it will do
  localStorage.setItem('gameStateSave',JSON.stringify(initialGameState));
  load();
}

function gameOver(text){
	window.alert(text);
	deleteSave();
}

function prettify(input){
  var output = Math.round(input * 1000000)/1000000;
	return output;
}

////////////////////////////////////////// interface utility functions //////////////////////////////////////////
function changeCSS(inputCssFile) {
  cssFile = inputCssFile;
  var oldlink = document.getElementById("cssColorSchemeLink");
  oldlink.href = cssFile;
}

function updateBacklog(newstring){
  backlog = newstring + "<br />" + backlog;
  document.getElementById("backlog").innerHTML = backlog;
}