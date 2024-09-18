import { useState } from "react";

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(
    (name) => props.inventory[name].foundation
  );
  const proteinList = Object.keys(props.inventory).filter(
    (name) => props.inventory[name].protein
  );
  const dressingList = Object.keys(props.inventory).filter(
    (name) => props.inventory[name].dressing
  );
  const extraList = Object.keys(props.inventory).filter(
    (name) => props.inventory[name].extra
  );

  //TODO: check if we can use the useMemo hooks here
  const [foundation, setFoundation] = useState("Pasta");
  const [protein, setProtein] = useState("Rökt kalkonfilé");
  const [dressing, setDressing] = useState("Ceasardressing");
  // The default value for the foundation will be Pasta
  // setFoundation is used to change the state of the foundation.

  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  // TODO: Change the code, so the select is bound to the component state at line 5
  // TODO: add an event handler when the slect value changes
  function handlerFoundation(e) {
    setFoundation(e.target.value);
    console.log(e.target.value);
  }
  function handlerProtein(e) {
    setProtein(e.target.value);
    console.log(e.target.value);
  }
  function handlerDressing(e) {
    setDressing(e.target.value);
    console.log(e.target.value);
  }
  function handlerExtras(e){
    // the state must be immutable. 
    const newExtraSate = {...extras};
    // therefore, we need to use the spread operator to make a copy of the extras state. 
    const {name, checked } = e.target;
    console.log(`${name} ${checked}`);
    if(newExtraSate[name]){
      delete newExtraSate[name];
    }
    else{
      newExtraSate[name] = checked;
    }
    setExtra(newExtraSate); 
    console.log(newExtraSate);
    //console.log(checked);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

        <fieldset className="col-md-12">
          <label htmlFor="foundation" className="form-label">
            Välj bas
          </label>
          <select
            value={foundation}
            onChange={handlerFoundation}
            className="form-select"
            id="foundation"
          >
            {foundationList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="col-md-12">
          <label htmlFor="protein" className="form-label">
            Välj protein
          </label>
          <select
            value={protein}
            className="form-select"
            onChange={handlerProtein}
            id="protein"
          >
            {proteinList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="col-md-12">
          <label htmlFor="dressing" className="form-label">
            Välj dressing
          </label>
          <select
            value={dressing}
            className="form-select"
            onChange={handlerDressing}
            id="dressing"
          >
            {dressingList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="col-md-12">
          <label>Välj tillbehör</label>
          <div className="row">
            {extraList.map((name) => {
              const isChecked = extras[name] ? true : false;
              return (
                <div className="form-check col-md-4" key={name}>
                  <label htmlFor={name} className="form-check-label">
                    {name} ({props.inventory[name].price} kr)
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={isChecked}
                    name={name}
                    id={name}
                    key={name}
                    onClick={handlerExtras}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
    /* 
    The foundations option is created by mapping the foundationList array.
    */

    // onchange is added to change the displayed value of the dropdown list.
  );
}
export default ComposeSalad;
