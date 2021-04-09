import ButtonLink from '../../Shared/ButtonLink';

import './About.css';

const About = () => {
    return (
        <div className="main-content about-page-content">
            <h2>About Page</h2>
            <p>PetAdopt is an animal rescue organization. We provide shelter, treatment and temporary care for abandoned or lost animals. PetAdopt is open for adoptions but only from good and responsible candidates.</p>
            <p>Find the next member of your family here!</p>

            <ButtonLink
                children="The Pets"
                to="/pets"
                color="info"
                className="pt-2" />
        </div>
    );
}

export default About;