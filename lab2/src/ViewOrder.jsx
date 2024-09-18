import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

export default function ViewOrder({ saladList, removeSalad }) {
    function handlerRemove (e){
        console.log(e.target.id);
        console.log(removeSalad(e.target.id));
    }
  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3 ">
        <h2>Varukorgen</h2>
        {saladList.length === 0 ? (
          <p>Det finns ingen sallad i beställningen</p>
        ) : (
          saladList.map((element) => (
            <div key={element.id} className="row bg-primary p-2 mb-2 rounded">
              <p
                className="col-10"
                key={element.id}
              >{`${element.toString()} ${element.getPrice()} kr`}</p>
              <button className="col" id={element.uuid} onClick={handlerRemove}>Tar bort</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
