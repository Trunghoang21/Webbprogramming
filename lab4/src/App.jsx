import 'bootstrap/dist/css/bootstrap.css'
import {useState} from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './Navbar';
import Spinner from './Spinner';
import Salad from "./Salad.mjs";
import {Outlet} from 'react-router-dom';
import {useNavigation} from 'react-router-dom';

function App() {
    // Initialize the salad list once from the local storage.
    const initialSaladList = () => {
        const shoppingcart = window.localStorage.getItem('shoppingCart');
        console.log(`from App.jsx: ${shoppingcart}`);
        return shoppingcart ? Salad.parse(shoppingcart) : [];
    }

    const [saladList, setSaladList] = useState(initialSaladList);
    const [editMode, setEditMode] = useState({edit: false, id: ''});
    const navigation = useNavigation()

    const modifyEditMode = ({edit, id}) => {
        console.log(`from App.jsx edit: ${edit} id: ${id}`);
        setEditMode({edit, id});

        // set editmode will be here.
    }
    const getSalad = (id) => {
        return saladList.find(salad => salad.uuid === id)
    }

    const updateSaladList = (newsalad) => {
        if (editMode.edit) {
            let updateList = saladList.map((salad) => salad.uuid === newsalad.uuid ? newsalad : salad);
            setSaladList(updateList);
            setEditMode({edit: false, id: ''});
            return updateList;
        } else {
            let updateList = [...saladList, newsalad]
            setSaladList(updateList);
            console.log(`from App updateSaladList: ${updateList}`);
            // logic for adding salad_list to the local Storage.
            window.localStorage.setItem('shoppingCart', JSON.stringify(updateList));
            return updateList;
        }
    }
    const removeSalad = (salad_id) => {
        let updateList = saladList.filter((salad) => salad.uuid !== salad_id);
        setSaladList(updateList);
        // add remove logic here!
        return updateList;

    }
    return (
        <div className="container py-4">
            <Header></Header>
            <Navbar></Navbar>
            {
                (navigation.state === 'loading') ?
                    <Spinner></Spinner> :
                    <Outlet context={{
                        saladList,
                        removeSalad,
                        modifyEditMode,
                        updateSaladList,
                        getSalad,
                        editMode
                    }}></Outlet>
            }
            <Footer></Footer>
        </div>
    );
}

export default App;