import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import firebase from './config/firebase';
import UserContext from './contexts/UserContext';
import CodeError from './components/Core/Errors/CodeError';
import NotFoundError from './components/Core/Errors/NotFoundError';
import Header from './components/Core/Header';
import Footer from './components/Core/Footer';
import Home from './components/Core/Home';
import About from './components/Core/About';
import Privacy from './components/Core/Privacy';
import Contacts from './components/Core/Contacts';
import Register from './components/Core/Register';
import Login from './components/Core/Login';
import Logout from './components/Core/Logout';
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
import ErrorBoundary from './components/Core/Errors/ErrorBoundary';
import ProtectedAnonymousRoute from './components/Shared/ProtectedRoutes/ProtectedAnonymousRoute';
import ProtectedUserRoute from './components/Shared/ProtectedRoutes/ProtectedUserRoute';
import ProtectedAdminRoute from './components/Shared/ProtectedRoutes/ProtectedAdminRoute';

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
					<ErrorBoundary>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/#" exact component={Home} />
							<Route path="/home" exact component={Home} />
							<Route path="/about" exact component={About} />
							<Route path="/privacy" exact component={Privacy} />
							<Route path="/contacts" exact component={Contacts} />
							<Route path="/pets" exact component={PetsAll} />
							<ProtectedUserRoute path="/pets/my" exact component={MyPets} redirectPath="/"/>
							<ProtectedAdminRoute path="/pets/add" exact component={PetAdd} redirectPath="/"/>
							<ProtectedAdminRoute path="/pets/adoption" exact component={PetsForAdoption} redirectPath="/"/>
							<ProtectedAdminRoute path="/pets/adopted" exact component={AdoptedPets} redirectPath="/"/>
							<ProtectedAnonymousRoute path="/register" exact component={Register} redirectPath="/"/>
							<ProtectedAnonymousRoute path="/login" exact component={Login} redirectPath="/"/>
							{/* <Route path="/logout" exact render={() => {
								if (user) {
									firebase.auth().signOut();
								}
								return <Redirect to="/" />
							}} /> */}
							<ProtectedUserRoute path="/logout" exact component={Logout} redirectPath="/"/>
							<ProtectedAdminRoute path="/pets/edit/:petId" component={PetEdit} redirectPath="/pets"/>
							<ProtectedAdminRoute path="/pets/delete/:petId" component={PetDelete} redirectPath="/pets"/>
							<ProtectedAdminRoute path="/pets/adoption/:petId" component={PetForAdoptionDetails} redirectPath="/pets/:petId"/>
							<ProtectedAdminRoute path="/pets/adopted/:petId" component={AdoptedPetDetails} redirectPath="/pets/:petId"/>
							<ProtectedUserRoute path="/pets/my/:petId" component={MyPetDetails} redirectPath="/pets/:petId"/>
							<Route path="/pets/:petId" component={PetDetails} />

							<Route path="/error" component={CodeError} />
							<Route component={NotFoundError} />
						</Switch>
					</ErrorBoundary>
				</div>
				<Footer />
			</div>
		</UserContext.Provider>
	);
}

export default App;
