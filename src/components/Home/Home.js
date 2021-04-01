import {Link} from 'react-router-dom';
import { Button } from 'reactstrap';

import './Home.css';

const Home=()=>{
    return(
        <div className="main-content home-page-content text-center">
            <h1>Welcome to PetAdopt</h1>
            <h4>Wanna see my brothers and sisters?</h4>
            <Button color="info"><Link to={'/pets'} className="home-link">The Pets</Link></Button>
        </div>
    );
}

export default Home;