'use strict';
/**
 * Reflection question 1
 * because the absence of the property will indicate that the property is not present in the object, which means it is false.
 * When trying to access a property that does not exist in an object, the result will be undefined, which is a falsy value.
 * Therefore, there are not need to specify these properties, which has the value of false in the object.  
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
let count2 = 1;
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => {
    console.log(count2 + ' ' + name);
    //console.log(name)
    count2++;
  });

console.log('\n--- for ... in ---------------------------------------')
let count = 1;
for (const name in inventory) {
  console.log(count + ' ' +name);
  count++;
}
/**
 * Reflection question 2
 * 
 * Enumerable properties are these properties whose internal flag is set to true.
 * These enumerable properties are one that will be included and visited when iterating over an object's properties
 * using for...in loop or the Object.keys() method. 
 * 
 * Own properties are properties that are directly present on the object and not inherited from the prototype chain.
 * 
 * The differences between the for..in loop and the Object.keys() method are: 
 * 1. The for..in loop iterates over all the enumerable properties of an object, including those inherited from the prototype chain. 
 * 2. The Object.keys() method will only return the own enumerable properties of an object. 
 * 
 * Iterating over properties of an object using the for..in loop and the Object.keys() method will return different results 
 * when there are some properties of the inventory object that are inherited from the prototype chain if there are any existing.
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  var names = Object.keys(inv);
  return names.filter(name => inv[name][prop])
              .map(name => `<option value="${name}" key="${name}"> ${name}, ${inv[name]["price"]} kr</option>`);
    
}
/* 
  The makeOptions return an array of strings, containing HTML <option> elements. 
  names is an array of the keys of the inventory object.
  The filter method is used to filter out keys that meets specific criteria, in this case, the value of the property prop is true.
  The map method is used to create a new array of strings, containing the HTML <option> elements,
  name is the key of the inventory object.
*/
console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
/* 
The Salad object is self-contained, stores the properties of the salad's ingredients. 
For this purpose, a object as dictionary is used to store the ingredients of the salad. 
*/
class Salad {
  static instanceCounter = 0;
 
  constructor(salad)  {
    this.ingredients = salad ? salad.ingredients : {};
    this.id = 'salad_' + Salad.instanceCounter++;
    this.uuid = uuidv4();
   }
  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
   }
  remove(name) {
    delete this.ingredients[name];
    return this;
   }
   static parse(salad){
    // The uuid should be the same when using the parse method.
    //console.log(`from the parse method: ${salad.uuid}`);
    // the salad.uuid will return undefined, because the salad is a string and not an object.
    var data = JSON.parse(salad);
    if (Array.isArray(data)) {
      return data.map(salad => {
        let re = new Salad(salad);
        re.uuid = salad.uuid;
        return re; 
      });
    }else {
      let re = new Salad(data);
      re.uuid = data.uuid;
      return re;}
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');
//console.log(myCaesarSalad);
console.log('\n--- Assignment 3 ---------------------------------------')
// add function getPrice() and count() in the prototype.
// for the use of the getPrice() method in the assignment 5, the getPrice method must be modified. 

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredients).reduce((acc, cur) => {
    const size = (cur.size != null && !isNaN(cur.size)) ? cur.size : 1; 
    return acc + cur.price*size;
  }, 0);
  // TODO: Discussion for the best practice here!
};
Salad.prototype.count = function(prop) {
  return Object.values(this.ingredients).filter(ingredient => ingredient[prop]).length;
}
/* 
  Object.values(this.ingredients) returns an array of the values of the ingredients object.
  The reduce method is used to calculate the total price of the salad, 
  which returns a single value by suming the price of each ingredient in the object. 
  Later on, the size property is added to the ingredient object, therefore, 
  the turnary operator is used to check if the size property is present in the ingredient object.


  The filter method is used to filter out the ingredients that have has a specific property. 
  The lentgh of the returned array is the number of ingredients belonging to a specific type of ingredient.

*/

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad); // type of Salad is a function
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof Salad.prototype.__proto__: ' + typeof Salad.prototype.__proto__);
console.log('--------');
//console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('Prototype of Salad ' + (Salad.prototype)); // will be 
console.log('check 1 Function vs Class: ' + (Function.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
console.log('TODO: answer the reflection question')
console.log(Salad.prototype);
console.log(typeof Salad.prototype);
console.log( Object.prototype);
/* 
Answer to assignment 3:
Salad is a function constructor, and the Salad.prototype is an object. 
The prototype of the Salad.prototype is undefined, because the object is the last object in the prototype chain.

Salad is an function which has the function.prototype as its prototype.
The Salad.prototype is an object, which has the Object.prototype as its prototype.
The instance of the Salad object, myCaesarSalad, has Object.prototype as its prototype. Therefore, check 2 is true. 
Check 1: the result is false, because Salad.prototype will peak at the Object.prototype, which is the last object in the prototype chain.
        The Object.getPrototypeOf(Salad) will return the Function.prototype, which is the prototype of the Salad function constructor.
        Therefore, the result is false.


*/
console.log('\n--- Assignment 4 ---------------------------------------')
const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
// class GourmetSalad which is an extension of the Salad class. 
class GourmetSalad extends Salad {
  constructor(salad) {
    super(salad);
  }
  // override the add method which allowing th user to add a specific amount of an ingredient. 
  add(name, properties, amount = 1 ){
    // make an copy of the properties and add the size property.
    // this step must be done due to the proper
    if (this.ingredients[name]){
      this.ingredients[name].size += amount; 
      return this;
    } 
    const propertiesWithSize = {...properties,size : amount};
    console.log(propertiesWithSize);
    super.add(name,propertiesWithSize);
    return this;
  }
}



let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min myCaesarSalad har id: ' + objectCopy.id);
//console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */

console.log('\n--- Assignment 7 ---------------------------------------')
console.log('\n---Test case 1: the uuids should not be the same------------ ')
const salad1 = new Salad();
// add ingredients to salad 1
console.log(salad1);
const salad2 = new Salad(salad1)
// salad1.uuid !== salad2.uuid, they are different salads
salad2.add('Bacon', inventory['Bacon']);
console.log(salad2);
console.log("Test case 1: the uuids should be the same. ")

console.log('\n---Test case 2: the uuids should be the same------------ ')
let salad3 = new Salad();
salad3.add('Bacon', inventory['Bacon']);
var stringSalad = JSON.stringify(salad3);
console.log(`the string object is ${stringSalad} `);
let salad4 = Salad.parse(stringSalad);
console.log(salad3);
console.log(salad4);

console.log('\n---Test case 3: input is an array of text obj. the uuids should be the same------------ ')
const arrayTextObj = JSON.stringify([salad3, salad3]);
const arrayCopyObj = Salad.parse(arrayTextObj);
console.log(arrayCopyObj);
//console.log(arrayCopyObj[0].ingredients);
