import { Link } from 'react-router-dom';

import './Footer.css';

const Footer=()=>{
    let year=new Date().getFullYear();

    return(
        <footer className="footer">
            <div className="container text-center">
                &copy; {year} - <Link to="/" className="footer-link">PetAdopt</Link> -
                <Link to="/privacy" className="footer-link"> Privacy</Link>
            </div>
        </footer>
    );
}

export default Footer;