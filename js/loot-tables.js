/* var LootTable = require('loot-table');
 
 
var loot = new LootTable();
loot.add('sword', 20);
loot.add('shield', 5);
loot.add('gold', 5);
loot.add(null, 1);
var item = loot.choose(); // most likely a sword, sometimes null */

//lootChoose(LootTable,number of items) number of items to be improved on the fly

/* var HouseLootTable = [
	[1, 20, 1, 6], //wood
	[2, 20, 1, 6], //food
  [3, 5, 1, 3],  //metal
	[99, 5, 1, 3] //trash
]; */

/* var HouseLootTable = [
	[wood, 20, 1, 6], //wood
	[food, 20, 1, 6], //food
  [metal, 5, 1, 3],  //metal
	[trash, 5, 1, 3] //trash
]; */

const HouseLootTable = {
	wood: [20, 1, 6],
  food: [20, 1, 6],
  metal: [5, 1, 3],
	trash: [5, 1, 3]
};



//SeaLootTable
//RuinsLootTable
//JungleLootTable
//CaveLootTable
//VolcanoLootTable


//salvage(houselootTable,weighting,range) - i.e. wood/metal/
//output 5 wood,
//printfunctionlog

// class loot {
  // constructor(itemid, weight, minimum, maximum) {
    // this.height = height;
    // this.width = width;
  // }
// }

const HouseLootTable = {
  wood: [20, 1, 6],
  food: [15, 1, 6],
  metal: [5, 1, 3],
  trash: [3, 1, 3]
};

Object.entries(HouseLootTable).forEach(([key, value]) => document.writeln(`${key}: ${value}<br>`)); // "foo: bar", "baz: 42"

const vals = Object.values(HouseLootTable)

var total = 0

for (const key of vals) {
total = total + key[0]
}

var rand = Math.floor((Math.random() * total) + 1);

document.writeln(total)

document.writeln(rand)

//document.write(vals.length)

//document.write(vals[1][0])

//document.write(Object.entries(HouseLootTable))

