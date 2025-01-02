import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aside } from '../components/Aside';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/NavBar';
import MyCoursesDashboard from '../assets/myCourses_components/myCoursesDashboard';

import useAuth from '../components/useAuth';

const MyCourses: React.FC = () => {
    const { userId, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !userId) {
            alert("Você precisa estar logado para acessar esta página.");
            navigate('/signin');
        }
    }, [userId, loading, navigate]);

    return (
        <div>
            <Navbar userName="Test" />
            <div className="flex flex-row mb-2">
                <Aside />
                <div className="flex-1 flex flex-row items-center md:mx-24 pt-10">
                    <MyCoursesDashboard />
                </div>
            </div>
            <div className="mt-6">
                <Footer />
            </div>

        </div>
    );
};

export default MyCourses;
