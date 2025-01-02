import logo from '../assets/GNOSI-2.png';
import "../styles/Footer.css";

export function Footer() {
    return (
        <footer id='Footer' className="bg-backgroundcolor mt-2 text-white flex justify-between items-center">
            <div className="flex items-center logo-container">
                <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                    <img src={logo} alt="Logo" width="100" height="100" />
                </a>
            </div>
            <div className="site-elements">
                <ul id="dvs-header__menuItems" className="nav flex-column font-gnosi">
                    <li className="nav-item text-white"><a href="/home" className="text-body-secondary">Home</a></li>
                    <li className="nav-item text-white"><a href="/myCourses" className="text-body-secondary">Cursos</a></li>
                    <li className="nav-item text-white"><a href="/userProfile" className="text-body-secondary">Perfil</a></li>
                </ul>
            </div>
        </footer>
    );
}