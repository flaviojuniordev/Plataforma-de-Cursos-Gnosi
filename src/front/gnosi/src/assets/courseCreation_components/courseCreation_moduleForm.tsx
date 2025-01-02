import { useState, useEffect } from 'react';
import { Typography, List, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


function CourseCreationModuleForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId } = location.state || {};
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [lessonTitle, setLessonTitle] = useState('');
    const [moduleLink, setModuleLink] = useState('');
    const [lessons, setLessons] = useState<{ title: string; videoLink: string }[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        console.log('Received Course ID:', courseId);
    }, [courseId]);

    const handleAddLesson = () => {
        setLessons([...lessons, { title: lessonTitle, videoLink: moduleLink }]);
        setLessonTitle('');
        setModuleLink('');
    };

    const handleRemoveLesson = (index: number) => {
        setLessons(lessons.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const payload = {
            name: moduleName,
            description: moduleDescription,
            courseId: courseId.replace(/"/g, ''),
            lessons: lessons,
        };

        try {
            const response = await fetch('http://localhost:8080/modules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            if (response.ok) {
                setSuccessMessage('Módulo criado com sucesso!');
                setModuleName('');
                setModuleDescription('');
                setLessons([]);
            } else {
                throw new Error('Failed to create module');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateQuiz = () => {
        navigate('/quizCreator', { state: { courseId } }); // Redireciona para a tela de criar o quiz com o courseId
    };

    return (
        <div className="container">
            <div className="bg-cardcolor w-full max-w-[640px] rounded-lg shadow-lg p-8">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Chakra Petch', color: 'white', fontSize: '20px' }}>
                        Criar módulos do curso
                    </Typography>

                    {successMessage && (
                        <div className="error-message mt-2" style={{ color: 'green' }}>
                            {successMessage}
                        </div>
                    )}
                </div>

                <form className="rounded-lg w-full mt-4">
                    <div className="form-group mb-4">
                        <label className="font-gnosi block text-white mb-2" htmlFor="moduleName">
                            Nome do Módulo
                        </label>
                        <input
                            className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                            type="text"
                            id="moduleName"
                            name="moduleName"
                            placeholder="Digite o nome do módulo"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="font-gnosi block text-white mb-2" htmlFor="moduleDescription">
                            Descrição do Módulo
                        </label>
                        <textarea
                            className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                            id="moduleDescription"
                            name="moduleDescription"
                            placeholder="Digite a descrição do módulo"
                            value={moduleDescription}
                            onChange={(e) => setModuleDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group mb-4">
                        <label className="font-gnosi block text-white mb-2" htmlFor="lessonTitle">
                            Título da Aula
                        </label>
                        <input
                            className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                            type="text"
                            id="lessonTitle"
                            name="lessonTitle"
                            placeholder="Digite o título da aula"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="font-gnosi block text-white mb-2" htmlFor="moduleLink">
                            Link da Aula (YouTube, Google Drive, etc)
                        </label>
                        <input
                            className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                            type="text"
                            id="moduleLink"
                            name="moduleLink"
                            placeholder="Adicione o link da aula"
                            value={moduleLink}
                            onChange={(e) => setModuleLink(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mt-8 mb-4">
                        <div className="flex justify-between gap-2">
                            <button
                                type="button"
                                onClick={handleAddLesson}
                                className="font-gnosi w-[48%] p-3 mt-2 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                            >
                                Adicionar Aula
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="font-gnosi w-[48%] p-3 mt-2 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                            >
                                Criar Módulo
                            </button>
                        </div>
                    </div>

                    <div className="form-group mb-4">
                        <div className="flex justify-between gap-2">
                            <button
                                type="button"
                                onClick={() => navigate('/myCourses')}
                                className="font-gnosi w-[48%] p-3 mt-2 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateQuiz}
                                className="font-gnosi w-[48%] p-3 mt-2 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                            >
                                Criar Avaliação
                            </button>
                        </div>
                    </div>
                </form>

                <List>
                    {lessons.map((lesson, index) => (
                        <Card key={index} sx={{ backgroundColor: '#1F1D35', borderRadius: '8px', marginBottom: '10px' }}>
                            <CardContent>
                                <h6 className="text-white text-lg">
                                    {lesson.title}
                                </h6>
                                <p className="text-[#A0AEC0] text-sm">
                                    {lesson.videoLink}
                                </p>
                            </CardContent>
                            <CardActions>
                                <button
                                    onClick={() => handleRemoveLesson(index)}
                                    className="bg-red-500 text-white text-sm py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Remover
                                </button>
                            </CardActions>
                        </Card>
                    ))}
                </List>
            </div>
        </div>
    );
}

export default CourseCreationModuleForm;