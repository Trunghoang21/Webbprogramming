import "bootstrap/dist/css/bootstrap.css";
import {useOutletContext} from "react-router-dom";
import {Outlet} from "react-router-dom";
import Toast from "./Toast.jsx";
import {useState} from "react";

export default function ViewOrder() {
    const {saladList, removeSalad, modifyEditMode} = useOutletContext();
    const [showToast, setShowToast] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState({});

    //console.log(`from ViewOrder: ${saladList}`);

    function handlerRemove(e) {
        console.log(e.target.id);
        console.log(removeSalad(e.target.id));
    }

    function handlerEdit(e) {
        modifyEditMode({edit: true, id: e.target.id});
        console.log(e.target.id);
    }

    async function handlerOrder() {
        //ToDo: send the order to the Rest Api server.
        const data = saladList.map(salad => Object.keys(salad.ingredients));
        console.log(`From handlerOrder ${JSON.stringify(data)}`);
        await fetch('http://localhost:8080/orders',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log(`response from POST method ${JSON.stringify(data)}`);
                setOrderConfirmation(data);
            })
            .catch(error => console.log(error));
        //ToDo: fix the logic later on. The toast should be shown after the order is sent to the server.
        // the information of the order should be shown in the toast.
        //setOrderConfirmation(data);
        setShowToast(true);
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
                                className="col-9"
                                key={element.id}
                            >{`${element.toString()} ${element.getPrice()} kr`}</p>
                            <button className="col text-primary bg-light" id={element.uuid} onClick={handlerRemove}>Tar
                                bort
                            </button>
                            <button className="col bg-warning" id={element.uuid} onClick={handlerEdit}> Ändra</button>
                        </div>
                    ))
                )}
                <Outlet context={saladList}></Outlet>
                <Toast
                    orderConfirmation={orderConfirmation}
                    setShowToast={setShowToast}
                    showToast={showToast}>
                </Toast>
            </div>
            <button className="btn btn-primary mt-2" onClick={handlerOrder}>
                Order
            </button>
        </div>
    );
}


