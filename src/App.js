import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Privacy from './components/Privacy';
import Contacts from './components/Contacts';
import Register from './components/Register';
import Login from './components/Login';
import PetsAll from './components/PetsAll';
import PetDetails from './components/PetDetails';
import PetAdd from './components/PetAdd';

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
						<Route path="/pets/add" component={PetAdd} />
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
