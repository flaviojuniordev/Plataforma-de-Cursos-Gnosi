import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Aside } from '../components/Aside';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTube from 'react-youtube';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import Comment from '../components/Comment';

interface Lesson {
    id: string;
    title: string;
    url: string;
    videoLink: string;
}

interface Module {
    id: string;
    name: string;
    description: string;
    lessons: Lesson[];
    uniqueId: string;
}

interface CourseData {
    name: string;
    description: string;
    imagePath: string;
    category: string;
    modules: Module[];
    comments?: Comment[];
}

export function Course() {
    const { courseId } = useParams<{ courseId: string }>();
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
    const [completedModules, setCompletedModules] = useState<{ [key: string]: boolean }>({});
    const [quizCompleted] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://localhost:8080/courses/${courseId}`)
            .then((response) => response.json())
            .then((data) => {
                const modulesWithUniqueId = data.modules.map((module: Module) => ({
                    ...module,
                    uniqueId: uuidv4(),
                }));
                setCourseData({ ...data, modules: modulesWithUniqueId });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar o curso', error);
                setLoading(false);
            });
    }, [courseId]);

    useEffect(() => {
        fetch(`http://localhost:8080/courses/${courseId}`)
            .then((response) => response.json())
            .then((data) => {
                const modulesWithUniqueId = data.modules.map((module: Module) => ({
                    ...module,
                    uniqueId: uuidv4(),
                }));
                const specialModule: Module = {
                    id: 'special-module',
                    name: 'Avaliação do curso',
                    description: 'Clique no botão abaixo para realizar a avaliação do curso.',
                    lessons: [],
                    uniqueId: uuidv4(),
                };
                setCourseData({ ...data, modules: [...modulesWithUniqueId, specialModule] });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar o curso', error);
                setLoading(false);
            });
    }, [courseId]);

    const handleGenerateCertificate = () => {
        navigate(`/certificate/${courseId}`, {
            state: { course: courseData}, // Passando o curso para a página de certificado
        });
    };

    const handleExpansion = (panel: string) => () => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [panel]: !prevExpanded[panel],
        }));
    };

    const handleLessonClick = (videoLink: string) => {
        setSelectedLesson(videoLink);
    };

    const handleModuleCompletionChange = (uniqueId: string) => {
        setCompletedModules((prevState) => ({
            ...prevState,
            [uniqueId]: !prevState[uniqueId],
        }));
    };

    const navigate = useNavigate();

    const handleQuizRedirect = () => {
        navigate(`/quiz/${courseId}`);
    };

    const calculateCompletionPercentage = () => {
        if (!courseData) return 0;
        const totalModules = courseData.modules.length;
        const completedCount = courseData.modules.reduce((count, module) => {
            return completedModules[module.uniqueId] ? count + 1 : count;
        }, 0);
        return totalModules > 0 ? (completedCount / totalModules) * 100 : 0;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (!courseData) {
        return <p>Erro ao carregar os dados do curso.</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar userName={""} />
            <div className="flex flex-row flex-1">
                <Aside />
                <main className="flex-1 flex flex-col justify-start items-center pb-12">
                    {/* Título e Descrição */}
                    <div className="w-full flex justify-center items-center mb-8">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold" style={{ color: 'white', fontFamily: 'Chakra Petch' }}>
                                {courseData.name} <span className="text-2xl font-normal" style={{ margin: '0 0.5rem' }}>-</span>
                                <span className="text-3xl font-normal" style={{ fontFamily: 'Chakra Petch' }}>{courseData.category}</span>
                            </h2>
                            <p className="text-xl mt-2" style={{ color: 'white' }}>{courseData.description}</p>
                        </div>
                        <div style={{ width: '200px', marginLeft: '100px' }}>
                            <LinearProgress
                                variant="determinate"
                                value={calculateCompletionPercentage()}
                                sx={{ backgroundColor: 'rgb(233 213 255)', height: '10px', borderRadius: '5px' ,'& .MuiLinearProgress-bar': { backgroundColor: '#9f4aec', },}}
                            />
                            <Typography
                                sx={{ textAlign: 'center', marginTop: '8px', color: 'white', fontFamily: 'Chakra Petch', fontSize: '12px' }}
                            >
                                {`Progresso: ${calculateCompletionPercentage().toFixed(2)}%`}
                            </Typography>
                        </div>
                    </div>

                    {/* Seção de Vídeo e Módulos */}
                    <div className="flex flex-row w-full max-w-5xl gap-12 mt-4 items-start mb-24">
                        {/* Player de Vídeo */}
                        <div style={{ flexBasis: '65%' }}>
                            {selectedLesson ? (
                                <div style={{ maxWidth: '100%' }}>
                                    <YouTube videoId={selectedLesson.split('v=')[1]} opts={{ width: '100%', height: '400' }} />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <p>Por favor, selecione uma aula.</p>
                                </div>
                            )}

                            {/* Seção de Comentários */}
                            <div className="w-full flex justify-center items-center mt-11">
                                <Comment courseId={courseId} />
                            </div>
                        </div>

                        {/* Módulos */}
                        <div style={{ flexBasis: '30%' }} className="flex flex-col gap-2">
                            {courseData.modules.map((module, index) => (
                                <Accordion
                                    key={module.id}
                                    expanded={expanded[`panel${index}`] || false}
                                    onChange={handleExpansion(`panel${index}`)}
                                    slots={{ transition: Fade as AccordionSlots['transition'] }}
                                    slotProps={{ transition: { timeout: 400 } }}
                                    sx={{
                                        backgroundColor: module.id === 'special-module' ? '#1F1D35' : '#1F1D35',
                                        borderRadius: '8px',
                                        boxShadow: 'none',
                                        height: expanded[`panel${index}`] ? 'auto' : '62px',
                                        maxWidth: '350px',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                        sx={{ padding: '0px 16px' }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'Chakra Petch',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginRight: 'auto',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            {module.name}
                                        </Typography>
                                        <Checkbox
                                            checked={completedModules[module.uniqueId] || false}
                                            onChange={() => handleModuleCompletionChange(module.uniqueId)}
                                            color="primary"
                                            sx={{
                                                color: 'white',
                                                '&.Mui-checked': {
                                                    color: 'rgb(168 85 247)',
                                                },
                                            }}
                                        />
                                    </AccordionSummary>

                                    <AccordionDetails sx={{
                                        paddingTop: '0px',
                                        paddingBottom: '4px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px'
                                    }}>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Chakra Petch',
                                                color: 'rgb(169, 169, 169)',
                                                marginBottom: '10px',
                                                fontSize: '1rem',
                                                paddingLeft: '10px'
                                            }}
                                        >
                                            {module.description}
                                        </Typography>
                                        <div>
                                            {module.id === 'special-module' ? (
                                                <button
                                                    onClick={handleQuizRedirect}
                                                    className="text-white bg-purple-600 w-full mb-2 px-3 py-1 rounded-xl hover:bg-purple-800"
                                                >
                                                    Realizar Avaliação
                                                </button>
                                            ) : (
                                                module.lessons.map((lesson) => (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => handleLessonClick(lesson.videoLink)}
                                                        className="text-white bg-transparent text-left underline w-full rounded-xl ml-1 mb-3 truncate hover:bg-transparent block"
                                                    >
                                                        {lesson.title}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}

                            {/* Mostrar o botão de gerar certificado se o quiz for concluído */}
                            {quizCompleted && (
                                <div className="mt-8 flex justify-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleGenerateCertificate}
                                    >
                                        Gerar Certificado
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                </main>
            </div>
            <Footer />
        </div>
    );
}