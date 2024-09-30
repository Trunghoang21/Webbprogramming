import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Salad from "./Salad.mjs";
import { useNavigate } from "react-router-dom";

function ComposeSalad() {
  const { inventory, updateSaladList, getSalad, editMode } = useOutletContext();
  const foundationList = Object.keys(inventory).filter(
    (name) => inventory[name].foundation
  );
  const proteinList = Object.keys(inventory).filter(
    (name) => inventory[name].protein
  );
  const dressingList = Object.keys(inventory).filter(
    (name) => inventory[name].dressing
  );
  const extraList = Object.keys(inventory).filter(
    (name) => inventory[name].extra
  );
  // define hook for navigation
  const navigate = useNavigate();
  //TODO: check if we can use the useMemo hooks here
  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [dressing, setDressing] = useState("");
  // The default value for the foundation will be Pasta
  // setFoundation is used to change the state of the foundation.

  const [extras, setExtra] = useState({});
  // TODO: Change the code, so the select is bound to the component state at line 5
  // TODO: add an event handler when the slect value changes
  const [foundationClicked, setFoundationClicked] = useState(false);
  const [proteinClicked, setProteinClicked] = useState(false);
  const [dressingClicked, setDressingClicked] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showExtrasError, setShowExtrasError] = useState(true);

  const handleInputClick = (setClicked) => {
    setClicked(true);
  };

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
  function handlerExtras(e) {
    // the state must be immutable.
    const newExtraSate = { ...extras };
    // therefore, we need to use the spread operator to make a copy of the extras state.
    const { name, checked } = e.target;
    console.log(`${name} ${checked}`);
    if (newExtraSate[name]) {
      delete newExtraSate[name];
    } else {
      newExtraSate[name] = checked;
    }
    setExtra(newExtraSate);
    console.log(newExtraSate);
    const length = Object.keys(newExtraSate).length;
    // code for check the input length of the user, if the length is between 2 and 8, the error message will be hidden.
    (length > 2 && length <= 8)
      ? setShowExtrasError(false)
      : setShowExtrasError(true);
    console.log(`the length is ${length} state is set to ${showExtrasError}`);
    //console.log(checked);
  }

  function handlerSubmission(e) {
    // add the code to check if the
    if(showExtrasError){
      return;
    }
    e.preventDefault();
    setTouched(true);
    if (!e.target.checkValidity()) {
      return;
    }
    let salad = new Salad();
    if (editMode.edit) {
      salad.uuid = editMode.id;
    }
    salad.add(foundation, inventory[foundation]);
    salad.add(protein, inventory[protein]);
    salad.add(dressing, inventory[dressing]);
    Object.keys(extras).map((name) => {
      if (extras[name]) {
        salad.add(name, inventory[name]);
      }
    });
    console.log(updateSaladList(salad));

    // update to the default values:
    setFoundation("");
    setProtein("");
    setDressing("");
    setExtra({});
    setFoundationClicked(false);
    setProteinClicked(false);
    setDressingClicked(false);
    setTouched(false);
    // navigate to the view-order page after a successful submission.
    navigate(`/view-order/confirm/${salad.uuid}`);
  }
  useEffect(() => {
    if (editMode.edit) {
      let toEditSalad = getSalad(editMode.id);
      let ingredients = toEditSalad.ingredients;
      setFoundation(
        Object.keys(ingredients).find((key) => ingredients[key].foundation)
      );
      setProtein(
        Object.keys(ingredients).find((key) => ingredients[key].protein)
      );
      setDressing(
        Object.keys(ingredients).find((key) => ingredients[key].dressing)
      );
      setExtra(
        Object.keys(ingredients)
          .filter((key) => ingredients[key].extra)
          .reduce((acc, key) => {
            acc[key] = true; // Set each filtered key's value to `true`
            return acc;
          }, {})
      );
    }
  }, [editMode.edit]);
  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Choose the content of your salad</h2>

        <form
          className={touched ? "was-validated" : ""}
          onSubmit={handlerSubmission}
          noValidate
        >
          <fieldset className="col-md-12">
            <label htmlFor="foundation" className="form-label">
              Select foundation
            </label>
            <select
              value={foundation}
              onChange={handlerFoundation}
              onClick={() => handleInputClick(setFoundationClicked)}
              className="form-select"
              id="foundation"
              required
            >
              {/*  
              {!foundationClicked && <option value="">Gör ditt val</option>}
              TODO: how to make the placeholder to disappear after the first click...
            */}
              <option value="" disabled>
                Choose a foundation
              </option>
              {foundationList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback alert alert-danger">
              Please select a valid foundation.
            </div>
          </fieldset>

          <fieldset className="col-md-12">
            <label htmlFor="protein" className="form-label">
              Select protein
            </label>
            <select
              value={protein}
              className="form-select"
              onChange={handlerProtein}
              onClick={() => handleInputClick(setProteinClicked)}
              id="protein"
              required
            >
              <option value="" disabled>
                {" "}
                Choose a protein
              </option>
              {proteinList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback alert alert-danger">
              Please select a valid protein.
            </div>
          </fieldset>

          <fieldset className="col-md-12">
            <label htmlFor="dressing" className="form-label">
              Select dressing
            </label>
            <select
              value={dressing}
              className="form-select"
              onClick={() => handleInputClick(setDressingClicked)}
              onChange={handlerDressing}
              id="dressing"
              required
            >
              <option value="" disabled>
                Choose a dressing
              </option>
              {dressingList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback alert alert-danger">
              Please select a valid dressing.
            </div>
          </fieldset>

          <fieldset className="col-md-12">
            <label>Select extras</label>
            <div className="row">
              {extraList.map((name) => {
                const isChecked = extras[name] ? true : false;
                return (
                  <div className="form-check col-md-4" key={name}>
                    <label htmlFor={name} className="form-check-label">
                      {name} ({inventory[name].price} kr)
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={isChecked}
                      name={name}
                      id={name}
                      key={name}
                      // change onClick to onChange
                      onChange={handlerExtras}
                    />
                  </div>
                );
              })}
            </div>
              {showExtrasError ? (
                <div className="alert alert-danger">
                  Please select between 3 and 8 extras.
              </div>
              ) :"" }
          </fieldset>

          <button type="submit" className="btn btn-primary mt-3">
            {editMode.edit ? "Update Salad" : "Add Salad"}
          </button>
        </form>
      </div>
    </div>
    /* 
    The foundations option is created by mapping the foundationList array.
    */

    // onchange is added to change the displayed value of the dropdown list.
    //TODO: add Caesar Salad - the form is pre-filled with selections for a Caesar salad.
  );
}
export default ComposeSalad;
