import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);
  const [saladList, setSaladList] = useState([]);
  const updateSaladList = (newsalad) =>{
    let updateList = [...saladList,newsalad]
    setSaladList(updateList);
    return updateList;
  }
  const removeSalad = (salad_id) =>{
    let updateList = saladList.filter((salad) => salad.uuid !== salad_id);
    setSaladList(updateList);
    // add remove logic here!
    return updateList;
   
  } 
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ViewOrder saladList={saladList} removeSalad={removeSalad} ></ViewOrder>
      <ComposeSalad inventory={inventory} updateSaladList={updateSaladList}></ComposeSalad>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;