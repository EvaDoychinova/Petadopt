import { Switch, Route } from 'react-router-dom';

import Header from './components/Core/Header';
import Footer from './components/Core/Footer';
import Home from './components/Core/Home';
import About from './components/Core/About';
import Privacy from './components/Core/Privacy';
import Contacts from './components/Core/Contacts';
import Register from './components/Core/Register';
import Login from './components/Core/Login';
import PetAdd from './components/PetAdd';
import PetsAll from './components/PetsAll';
import PetDetails from './components/PetDetails';
import PetDelete from './components/PetDelete';
import PetEdit from './components/PetEdit';
import PetsForAdoption from './components/PetsForAdoption';
import PetForAdoptionDetails from './components/PetForAdoptionDetails';

import './App.css';

const App = () => {
	return (
		<div className="body-container">
			<Header />
			<div className="main-container">
				{/* <div className="main-content"> */}
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/privacy" exact component={Privacy} />
						<Route path="/contacts" exact component={Contacts} />
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
						<Route path="/pets" exact component={PetsAll} />
						<Route path="/pets/add" exact component={PetAdd} />
						<Route path="/pets/adoption" exact component={PetsForAdoption} />
						
						<Route path="/pets/edit/:petId" component={PetEdit} />
						<Route path="/pets/delete/:petId" component={PetDelete} />
						<Route path="/pets/adoption/:petId" component={PetForAdoptionDetails} />
						<Route path="/pets/:petId" component={PetDetails} />

						<Route component={Error} />
					</Switch>
				{/* </div> */}
			</div>
			<Footer />
		</div>
	);
}

export default App;
