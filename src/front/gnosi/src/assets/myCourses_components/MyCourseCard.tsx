import React, { useEffect, useState } from 'react';
import useAuth from '../../components/useAuth';
import { useNavigate } from 'react-router-dom';
import MyCourseActionModal from './MyCourseActionModal';
import PageChange from '../../components/PageChange';

interface myCourseCardProps {
    courseId: string;
    imagePath: string;
    name: string;
    category: string;
    description: string;
    onClick: (courseId: string) => void;
}

const MyCourseCard: React.FC<myCourseCardProps> = ({ courseId, imagePath, name, category, description, onClick }) => {
    return (
        <div
            id='cardCourse'
            className="flex shadow-md rounded-3xl overflow-hidden my-4 p-3 h-48 max-w-2xl"
            onClick={() => onClick(courseId)}
        >
            <img id='imagemyCourse' src={imagePath} alt={name} className="sm:w-1/3 h-full object-cover rounded-3xl" />
            <div className="p-4 w-2/3">
                <div id='infomyCourse' className="flex items-center justify-between">
                    <h3 className="text-2xl text-white font-medium">{name}</h3>
                    <span id='courseDate' className="text-white text-lg">{category}</span>
                </div>
                <p className="text-[#919090] mt-3 line-clamp-3">{description}</p>
            </div>
        </div>
    );
};

const CoursesList: React.FC = () => {
    const { userId, userType, loading: authLoading } = useAuth();
    const [courses, setCourses] = useState<myCourseCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const coursesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;
        if (userType) {
            const url = userType === 'TEACHER'
                ? `http://localhost:8080/courses/teacher/${userId}`
                : 'http://localhost:8080/enrollments/student/courses';

            fetch(url, {
                method: 'GET',
                credentials: 'include',
            })
                .then(response => response.json())
                .then(async data => {
                    console.log("Cursos recebidos:", data);
                    const coursesWithImages = await Promise.all(data.map(async (course: any) => {
                        const imageResponse = await fetch(`http://localhost:8080/courses/${course.courseId}/image`);
                        const imageBlob = await imageResponse.blob();
                        const imageUrl = URL.createObjectURL(imageBlob);
                        return {
                            ...course,
                            imagePath: imageUrl,
                        };
                    }));
                    setCourses(coursesWithImages);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Erro ao buscar os cursos", error);
                    setLoading(false);
                });
        }
    }, [authLoading, userType]);

    if (loading) {
        return <p>Carregando cursos...</p>;
    }

    if (courses.length === 0) {
        return <p>Nenhum curso encontrado.</p>;
    }

    const handleClick = (courseId: string) => {
        if (userType === 'TEACHER') {
            setSelectedCourseId(courseId);
            setIsModalOpen(true);
        } else if (userType === 'STUDENT') {
            navigate(`/course/${courseId}`);
        }
    };

    const handleView = () => {
        if (selectedCourseId) {
            navigate(`/course/${selectedCourseId}`);
        }
    };

    const handleEdit = () => {
        if (selectedCourseId) {
            navigate(`/courseEdition/${selectedCourseId}`);
        }
    };

    // Paginação
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            {currentCourses.map(course => (
                <MyCourseCard
                    key={course.courseId}
                    courseId={course.courseId}
                    name={course.name}
                    description={course.description}
                    imagePath={course.imagePath || 'default-image.jpg'}
                    category={course.category}
                    onClick={handleClick}
                />
            ))}
            <MyCourseActionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onView={handleView}
                onEdit={handleEdit}
            />
            <PageChange
                currentPage={currentPage}
                totalPages={totalPages}
                totalCourses={courses.length}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
            />
        </div>
    );
};

export default CoursesList;