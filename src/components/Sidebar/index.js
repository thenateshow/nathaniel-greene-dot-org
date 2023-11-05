import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import LogoN from '../../assets/images/logo-no-background.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
    <div className="nav-bar">
        <Link className="logo" to="/">
            <img src={LogoN} alt="logo" />
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#a04924" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#a04924" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="projects-link" to="/projects">
                <FontAwesomeIcon icon={faLaptopCode} color="#a04924" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#a04924" />
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/nathaniel-greene-2b50181b7">
                    <FontAwesomeIcon icon={faLinkedin} color="#a04924" />
                </a>
            </li>
            <li>
                <a target="_blank" rel="noreferrer" href="https://www.github.com/thenateshow">
                    <FontAwesomeIcon icon={faGithub} color="#a04924" />
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar;