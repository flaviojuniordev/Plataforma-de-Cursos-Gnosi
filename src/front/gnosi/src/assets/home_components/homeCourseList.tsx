import React, { useEffect, useState } from 'react';
import HomeCourseCard from './homeCourseCard';
import '../../styles/home.css';

interface HomeCourseCardProps {
    courseId: string;
    imagePath: string;
    name: string;
    category: string;
    description: string;
    teacherName: string;
    teacherImage: string;
}

interface HomeCourseListProps {
    selectedCategory: string;
}

const HomeCourseList: React.FC<HomeCourseListProps> = ({ selectedCategory }) => {
    const [courses, setCourses] = useState<HomeCourseCardProps[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:8080/courses');
                const data = await response.json();
                const coursesWithImages = await Promise.all(data.map(async (course: any) => {
                    const imageResponse = await fetch(`http://localhost:8080/courses/${course.courseId}/image`);
                    const imageBlob = await imageResponse.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);

                    const teacherImageResponse = await fetch(`http://localhost:8080/users/${course.teacher.userId}/profile-picture`);
                    const teacherImageBlob = await teacherImageResponse.blob();
                    const teacherImageUrl = URL.createObjectURL(teacherImageBlob);
                    return {
                        ...course,
                        imagePath: imageUrl,
                        teacherName: `${course.teacher.firstName} ${course.teacher.lastName}`,
                        teacherImage: teacherImageUrl,
                    };
                }));
                setCourses(coursesWithImages);
            } catch (error) {
                console.error("Erro ao buscar os cursos", error);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = selectedCategory === 'Todos'
        ? courses
        : selectedCategory === 'Programação'
            ? courses.filter(course => ['FrontEnd', 'BackEnd', 'FullStack'].includes(course.category))
            : courses.filter(course => course.category === selectedCategory);

    return (
        <div id='HomeCourseList' className="">
            {filteredCourses.map(course => (
                <div key={course.courseId} className="relative my-1">
                    <HomeCourseCard
                        courseId={course.courseId}
                        name={course.name}
                        description={course.description}
                        imagePath={course.imagePath}
                        category={course.category}
                        teacherName={course.teacherName}
                        teacherImage={course.teacherImage}
                    />
                </div>
            ))}
        </div>
    );
};

export default HomeCourseList;
