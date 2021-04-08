import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Admin from './secrets/admin.json';
import firebase from './config/firebase';
import UserContext from './contexts/UserContext';
import NotFoundError from './components/Core/NotFoundError';
import Error from './components/Core/Error';
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
import AdoptedPets from './components/AdoptedPets';
import MyPets from './components/MyPets';
import PetsForAdoption from './components/PetsForAdoption';
import PetForAdoptionDetails from './components/PetForAdoptionDetails';
import MyPetDetails from './components/MyPetDetails/MyPetDetails';
import AdoptedPetDetails from './components/AdoptedPetDetails/AdoptedPetDetails';

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
						<Route path="/pets" exact component={PetsAll} />
						<Route path="/pets/my" exact>
							{
								user ? <MyPets /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/pets/add" exact>
							{
								(user && user.uid === Admin.uid) ? <PetAdd /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/pets/adoption" exact>
							{
								(user && user.uid === Admin.uid) ? <PetsForAdoption /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/pets/adopted" exact>
							{
								(user && user.uid === Admin.uid) ? <AdoptedPets /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/register" exact>
							{
								!user ? <Register /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/login" exact>
							{
								!user ? <Login /> : <Redirect to="/" />
							}
						</Route>
						<Route path="/logout" exact render={() => {
							if (user) {
								firebase.auth().signOut();
							}
							return <Redirect to="/" />
						}} />
						<Route path="/pets/edit/:petId">
							{
								(user && user.uid === Admin.uid) ? <PetEdit /> : <Redirect to="/pets" />
							}
						</Route>
						<Route path="/pets/delete/:petId">
							{
								(user && user.uid === Admin.uid) ? <PetDelete /> : <Redirect to="/pets" />
							}
						</Route>
						<Route path="/pets/adoption/:petId">
							{
								(user && user.uid === Admin.uid) ? <PetForAdoptionDetails /> : <Redirect to="/pets/:petId" />
							}
						</Route>
						<Route path="/pets/adopted/:petId" >
							{
								(user && user.uid === Admin.uid) ? <AdoptedPetDetails /> : <Redirect to="/pets/:petId" />
							}
						</Route>
						<Route path="/pets/my/:petId">
							{
								user ? <MyPetDetails /> : <Redirect to="/pets/:petId" />
							}
						</Route>
						<Route path="/pets/:petId" component={PetDetails} />

						<Route path='/error' component={Error} />
						<Route path='/not-found' component={NotFoundError} />
					</Switch>
				</div>
				<Footer />
			</div>
		</UserContext.Provider>
	);
}

export default App;
