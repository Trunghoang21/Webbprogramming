"use strict";
import { v4 as uuidv4 } from "uuid";
class Salad {
  static instanceCounter = 0;

  constructor(salad) {
    this.ingredients = salad ? salad.ingredients : {};
    this.id = "salad_" + Salad.instanceCounter++;
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
  toString(){
    const ingredientNames = Object.keys(this.ingredients);
    return ingredientNames.join(" ");
  }
  static parse(salad) {
    // The uuid should be the same when using the parse method.
    //console.log(`from the parse method: ${salad.uuid}`);
    // the salad.uuid will return undefined, because the salad is a string and not an object.
    var data = JSON.parse(salad);
    if (Array.isArray(data)) {
      return data.map((salad) => {
        let re = new Salad(salad);
        re.uuid = salad.uuid;
        return re;
      });
    } else {
      let re = new Salad(data);
      re.uuid = data.uuid;
      return re;
    }
  }
}
Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients).reduce((acc, cur) => {
    const size = cur.size != null && !isNaN(cur.size) ? cur.size : 1;
    return acc + cur.price * size;
  }, 0);
  // TODO: Discussion for the best practice here!
};
Salad.prototype.count = function (prop) {
  return Object.values(this.ingredients).filter(
    (ingredient) => ingredient[prop]
  ).length;
};

export default Salad;
