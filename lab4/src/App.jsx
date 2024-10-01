import 'bootstrap/dist/css/bootstrap.css'
import {useState} from 'react';
import Header from './header';
import Footer from './footer';
import Navbar from './Navbar';
import Spinner from './Spinner';
import {Outlet} from 'react-router-dom';
import {useNavigation} from 'react-router-dom';

function App() {

    const [saladList, setSaladList] = useState([]);
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
            console.log(`from App: ${updateList}`);
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