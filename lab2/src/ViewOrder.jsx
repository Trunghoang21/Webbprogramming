import 'bootstrap/dist/css/bootstrap.css'
import {useState} from 'react';

export default function ViewOrder({saladList}){
    return(
        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3 ">
                <h2>Varukorgen</h2>
                {saladList.length === 0 ? 
                (<p>order saknas</p>):
        (saladList.map(element => (<p key={element.uuid}>{`${element.toString()} ${element.getPrice()} kr`}</p>) ))
                }
            </div>

        </div>
    )
}