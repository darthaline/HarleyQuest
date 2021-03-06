// global variables
var cookies = 0;
var cursors = 0; // 10:1 ratio
var grandmas = 0; // 25:2 ratio
var cursorMultiplier = 1; //cookies generated by cursors per tick
var grandmaMultiplier = 2; //cookies generated by cursors per tick
var baseCursorCost = 10; //base cost of cursors
var baseGrandmaCost = 25; //base cost of grandmas
var cursorGrowthCurve = 1.1; //exponential cost growth coefficient of cursors
var grandmaGrowthCurve = 1.1; //exponential cost growth coefficient of grandmas

// game loop
window.setInterval(function(){
  var cookiesGeneratedperTick = cursors * cursorMultiplier + grandmas * grandmaMultiplier;
	cookieClick(cookiesGeneratedperTick);
	save();
}, 1000);

// game logic
function cookieClick(number){
    cookies = cookies + number;
    updateElement('cookies', cookies);
};

function calculateCost(baseCost, growthCurve, number){
  var cost = Math.floor(baseCost * Math.pow(growthCurve, number));     //works out the cost of this cursor
  return cost;
}

function buyCursor(){
  var cursorCost = calculateCost(baseCursorCost, cursorGrowthCurve, cursors);     //works out the cost of this cursor
  if(cookies >= cursorCost){                                   //checks that the player can afford the cursor
    cursors = cursors + 1;                                   //increases number of cursors
    cookies = cookies - cursorCost;                          //removes the cookies spent
    updateElement('cookies', cookies); //updates the number of cookies for the user
    updateElement('cursors', cursors); //updates the number of cursors for the user
  };
  var nextCursorCost = calculateCost(baseCursorCost, cursorGrowthCurve, cursors);       //works out the cost of the next cursor
  updateElement('cursorCost', nextCursorCost); //updates the number of cookies for the user
};

function buyGrandma(){
  var grandmaCost = calculateCost(baseGrandmaCost, grandmaGrowthCurve, grandmas);     //works out the cost of this grandma
  if(cookies >= grandmaCost){                                   //checks that the player can afford the grandma
    grandmas = grandmas + 1;                                   //increases number of grandmas
    cookies = cookies - grandmaCost;                          //removes the cookies spent
    updateElement('cookies', cookies); //updates the number of cookies for the user
    updateElement('grandmas', grandmas); //updates the number of grandmas for the user
  };
  var nextGrandmaCost = calculateCost(baseGrandmaCost, grandmaGrowthCurve, grandmas);       //works out the cost of the next grandma
  updateElement('grandmaCost', nextGrandmaCost); //updates the number of grandmas for the user
};

// game utility functions
function save(){
	var save = {
    cookies: cookies,
    cursors: cursors,
    grandmas: grandmas
	};
	localStorage.setItem('save',JSON.stringify(save));
}

function load(){
  var savegame = JSON.parse(localStorage.getItem('save'));
	if (typeof savegame.cookies !== 'undefined') cookies = savegame.cookies;
	if (typeof savegame.cursors !== 'undefined') cursors = savegame.cursors;
  if (typeof savegame.grandmas !== 'undefined') grandmas = savegame.grandmas; 
  updateAllElements()
};

function updateElement(id, value){
  document.getElementById(id).innerHTML = prettify(value);  //updates the number of cursors for the user
}

function updateAllElements() {
  updateElement('cookies', cookies); //updates the number of cookies for the user
  updateElement('cursors', cursors); //updates the number of cursors for the user
  updateElement('cursorCost', calculateCost(baseCursorCost, cursorGrowthCurve, cursors));
  updateElement('grandmas', grandmas); //updates the number of grandmas for the user
  updateElement('grandmaCost', calculateCost(baseGrandmaCost, grandmaGrowthCurve, grandmas));
}

function deleteSave(){
  //localStorage.removeItem('save');
  //people say command is asynchronous and doesn't happen outright which is not what we want, therefore i just update the save with 0 vals
  //i'm sure there is a more elegant solution, but for now it will do
  var save = {
    cookies: 0,
    cursors: 0,
    grandmas: 0
	};
  localStorage.setItem('save',JSON.stringify(save));
  load();
}

function prettify(input){
  var output = Math.round(input * 1000000)/1000000;
	return output;
}