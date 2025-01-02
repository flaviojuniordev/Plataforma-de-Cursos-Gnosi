import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";
import useAuth from '../../components/useAuth';

interface HomeCourseCardProps {
    courseId: string;
    imagePath: string;
    name: string;
    category: string;
    description: string;
    teacherName: string;
    teacherImage: string;
}

const HomeCourseCard: React.FC<HomeCourseCardProps> = ({ courseId, imagePath, name, category, teacherName, teacherImage }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { userType } = useAuth();

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmEnrollment = async () => {
        if (userType !== 'STUDENT') {
            alert('Você precisa ser um aluno para se inscrever no curso.');
            setIsModalOpen(false);
            return;
        }

        try {
            const checkEnrollmentResponse = await fetch(`http://localhost:8080/enrollments/student/${courseId}/enrolled`, {
                method: 'GET',
                credentials: 'include',
            });

            if (checkEnrollmentResponse.ok) {
                alert('Você já está inscrito neste curso.');
            } else {
                const message = await checkEnrollmentResponse.text();
                if (checkEnrollmentResponse.status === 404) {
                    const enrollResponse = await fetch(`http://localhost:8080/enrollments/enroll?courseId=${courseId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            courseId: courseId,
                        }),
                    });

                    if (enrollResponse.ok) {
                        navigate(`/course/${courseId}`);
                    } else {
                        const errorMessage = await enrollResponse.text();
                        alert(`Erro ao inscrever: ${errorMessage}`);
                    }
                } else {
                    alert(`Erro: ${message}`);
                }
            }
        } catch (error) {
            console.error('Erro ao verificar inscrição do aluno:', error);
            alert("Ocorreu um erro ao verificar sua inscrição.");
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div id="cardHome" onClick={handleClick} className="cursor-pointer shadow-md rounded-3xl overflow-hidden sm:m-4 lg:mx-6 :mdmx-4">
                <div id="divImagem" className="flex justify-center items-center">
                    <img id="imagemCurso" src={imagePath} alt={name} className="rounded-2xl mt-4 object-cover shadow-xl" />
                </div>
                <div id='card-content' className=" bottom-0 left-0 right-0 bg-opacity-50 p-4">
                    <h3 id='course-name' className="text-2xl text-white font-medium truncate">{name}</h3>
                    <span id="courseDate" className="text-white text-lg">{category}</span>
                    <div className='mt-5 flex items-center gap-4'>
                        <img src={teacherImage} alt="User" className="w-12 h-12 rounded-full" />
                        <div>
                            <p className='text-[#6B6B6B]'>Professor</p>
                            <p className='text-white'>{teacherName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
                    <div className="absolute inset-0 bg-black opacity-50 z-30" />

                    <div id="modalHome" className="relative bg-white rounded-xl p-6 w-96 max-w-full z-50">
                        <h2 className="text-2xl font-semibold text-center mb-4">Confirmação de Inscrição</h2>
                        <p className="text-center text-white mb-6 opacity-90">Você tem certeza que deseja se inscrever no curso <strong>{name}</strong>?</p>

                        <div className="flex justify-between">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmEnrollment}
                                className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomeCourseCard;