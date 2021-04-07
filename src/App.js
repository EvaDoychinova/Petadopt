import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import firebase from './config/firebase';
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
	const [user, setUser] = useState();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(setUser);
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<div className="body-container">
				<Header />
				<div className="main-container">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/about" exact component={About} />
						<Route path="/privacy" exact component={Privacy} />
						<Route path="/contacts" exact component={Contacts} />
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
						<Route path="/logout" exact render={() => {
							firebase.auth().signOut();
							return <Redirect to="/" />
						}} />
						<Route path="/pets" exact component={PetsAll} />
						<Route path="/pets/add" exact component={PetAdd} />
						<Route path="/pets/adoption" exact component={PetsForAdoption} />

						<Route path="/pets/edit/:petId" component={PetEdit} />
						<Route path="/pets/delete/:petId" component={PetDelete} />
						<Route path="/pets/adoption/:petId" component={PetForAdoptionDetails} />
						<Route path="/pets/:petId" component={PetDetails} />

						<Route component={Error} />
					</Switch>
				</div>
				<Footer />
			</div>
		</UserContext.Provider>
	);
}

export default App;
