import ButtonLink from '../../Shared/ButtonLink';

import './Home.css';

const Home=()=>{
    return(
        <div className="main-content home-page-content text-center">
            <h1>Welcome to PetAdopt</h1>
            <h4>Wanna see my buddies?</h4>
            <ButtonLink className="mt-2" to="/pets">The Pets</ButtonLink>
        </div>
    );
}

export default Home;