import { Fragment } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import { Button } from 'reactstrap';

import './App.css';

const App = () => {
	return (
		<div className="body-container">
			<Header />
			<div className="main-container">
				<div className="container">
					<Button color="danger">Danger Button</Button>
					<Button color="primary">Primary Button</Button>
					<Button color="secondary">Secondary Button</Button>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
