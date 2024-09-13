'use strict';

import inventory from './inventory.mjs';
console.log("----this is the playground file for testing different methods or fucntions-----");

let count = 1
for (let name in inventory) {
    console.log(`${count} ${name}`);
    count++;
}

function makeOptions(inv, prop) {
    var names = Object.keys(inv);
    return names.filter(name => inv[name][prop])
                .map(name => `<option value="${name}" key="${name}"> ${name}, ${inv[name]["price"]} kr</option>`);
    
    
 }
console.log(makeOptions(inventory, 'foundation'));
 // makeOptions(inventory, 'foundation');