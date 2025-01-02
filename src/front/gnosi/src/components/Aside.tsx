
import logo from '../assets/GNOSI-2.png';
import "../styles/Aside.css";
import { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaAward, FaPlus, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

export function Aside() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { userId, userType } = useAuth();

    const ToggleMenu = () => {
        setIsOpen((isOpen) => !isOpen);
    };

    const handleHomeRedirect = () => {
        navigate('/home');
    };

    const handleMyCoursesRedirect = () => {
        navigate('/myCourses');
    };

    const handleProfileRedirect = () => {
        navigate('/userProfile');
    };

    const handleCertificateRedirect = () => {
        navigate('/certificate');
    };

    const handleCourseCreationRedirect = () => {
        navigate('/courseCreation');
    };

    const handleMetricsRedirect = () => {
        navigate('/metrics');
    };

    return (
        <div className="flex flex-row">
            <div className={`overlay ${isOpen ? "is-open" : ""}`} onClick={ToggleMenu}></div>
            <aside className={` ml-2 w-1/8 bg-asidecolor p-2 shadow-lg rounded-3xl ${isOpen ? "is-open" : ""}`}>
                <ul className="text-white space-y-4">
                    <li className="dvs-header__trigger" onClick={ToggleMenu}>
                        {isOpen ? (
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaTimes size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaBars size={24} />
                            </motion.div>
                        )}
                    </li>
                    <li className={`dvs-header__menuItems ${isOpen ? "is-open" : ""}`}>
                        <div className="flex flex-col items-start flex items-center justify-center">

                            <img src={logo} alt="Logo gnosi" width="90" height="24" className="bi bi-award mt-4" />

                            <button
                                onClick={handleHomeRedirect}
                                style={{
                                    backgroundColor: 'white',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                }}
                                className="flex items-center justify-center shadow-md mt-8"
                            >
                                <FaHome size={24} color="#AA47F0" />
                            </button>

                            <button
                                onClick={handleMyCoursesRedirect}
                                style={{
                                    backgroundColor: 'white',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                }}
                                className="flex items-center justify-center shadow-md mt-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#AA47F0"
                                    className="bi bi-book" viewBox="0 0 16 16">
                                    <path
                                        d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                                </svg>
                            </button>

                            {userId && (
                                <button
                                    onClick={handleProfileRedirect}
                                    style={{
                                        backgroundColor: 'white',
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                    }}
                                    className="flex items-center justify-center shadow-md mt-3"
                                >
                                    <FaUser size={24} color="#AA47F0" />
                                </button>
                            )}

                            {userId && userType === 'TEACHER' && (
                                <button
                                    onClick={handleCourseCreationRedirect}
                                    style={{
                                        backgroundColor: 'white',
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                    }}
                                    className="flex items-center justify-center shadow-md mt-3"
                                >
                                    <FaPlus size={24} color="#AA47F0" />
                                </button>
                            )}

                            <button
                                onClick={handleCertificateRedirect}
                                style={{
                                    backgroundColor: 'white',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                }}
                                className="flex items-center justify-center shadow-md mt-3"
                            >
                                <FaAward size={24} color="#AA47F0" />
                            </button>


                            {userId === 'b1daabf0-72a1-4c67-b812-1312afc86af8' && (
                                <button
                                    onClick={handleMetricsRedirect}
                                    style={{
                                        backgroundColor: 'white',
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                    }}
                                    className="flex items-center justify-center shadow-md mt-3"
                                >
                                    <FaCog size={24} color="#AA47F0" />
                                </button>
                            )}

                        </div>
                    </li>
                </ul>
            </aside>
        </div>
    );
}
