import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);
  const [saladList, setSaladList] = useState([]);
  const [editMode, setEditMode] = useState({edit: false, id:''});

  const modifyEditMode = ({edit, id} ) => {
    console.log(`from App.jsx edit: ${edit} id: ${id}`);
    setEditMode({edit, id});
    
    // set editmode will be here.
  }
  const getSalad = (id) =>{
    return saladList.find(salad => salad.uuid === id)
  }

  const updateSaladList = (newsalad) =>{
    if(editMode.edit){
      let updateList = saladList.map((salad) => salad.uuid === newsalad.uuid ? newsalad : salad);
      setSaladList(updateList);
      setEditMode({edit:false, id:''});
      return updateList;
    }else{
    let updateList = [...saladList,newsalad]
    setSaladList(updateList);
    return updateList;
    }
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

      <ViewOrder saladList={saladList} removeSalad={removeSalad} modifyEditMode={modifyEditMode}></ViewOrder>
      <ComposeSalad inventory={inventory} updateSaladList={updateSaladList} getSalad={getSalad} editMode= {editMode} ></ComposeSalad>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;