import {Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
export default function Navbar(){
    return(
        
            <ul className="nav nav-tabs nav-underline ">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/compose-salad" className="nav-link">Make your salad</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/view-order" className="nav-link">View the order</NavLink>
                </li>
            </ul>
        
    );
}