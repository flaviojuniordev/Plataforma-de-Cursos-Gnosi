import React, { useEffect, useState } from 'react';
import CoursesList from '../myCourses_components/MyCourseCard';
import Calendar from '../myCourses_components/myCourseCalendar';
import '../../styles/myCourses.css';
import useAuth from '../../components/useAuth';


const MyCoursesDashboard: React.FC = () => {
    const { userId } = useAuth();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.firstName);
                } else {
                    const errorData = await response.json();
                    alert(`Falha ao carregar os dados do usuário: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
                alert("Ocorreu um erro ao carregar os dados do usuário");
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="flex flex-wrap w-full">
            <div className="flex-1 px-6">
                <h1 className="text-5xl font-bold">Olá, {userName}</h1>
                <h1 className="text-4xl mt-20 mb-7">Meus Cursos</h1>

                <div className="flex space-x-6 mb-6">
                    <h2 id='optionChosen' className="text-2xl font-semibold cursor-pointer">Todos</h2>
                    <h2 className="text-2xl font-semibold text-gray-600 cursor-pointer">Completos</h2>
                </div>

                <CoursesList/>
            </div>

            <div id='divCalendar' className="ml-4 mt-20 lg:mt-64 lg:pr-2 xl:pr-10 lg:block">
                <Calendar/>
            </div>
        </div>
    );
};

export default MyCoursesDashboard;