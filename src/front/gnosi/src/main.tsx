import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { UserProfile } from './pages/userProfile';
import { Course } from './pages/course';
import CourseCreation from './pages/courseCreation';
import MyCourses from './pages/myCourses';
import CourseCreationModule from './pages/courseCreationModule';
import Home from './pages/home';
import QuizCreator from './pages/quizCreator';
import QuizViewer from './pages/quizViewer';
import './index.css';
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import CourseEdition from './pages/courseEdition';
import CourseEditionModule from './pages/courseEditionModule';
import { Metrics } from "./pages/metrics.tsx";  // Importando a página de métricas
import { Certificate } from './pages/certificate.tsx'; // Importando a página de Certificado

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/course/:courseId" element={<Course />} />
                <Route path="/courseCreation" element={<CourseCreation />} />
                <Route path="/myCourses" element={<MyCourses />} />
                <Route path="/courseCreationModule" element={<CourseCreationModule />} />
                <Route path="/quizCreator" element={<QuizCreator />} />
                <Route path="/quiz/:courseId" element={<QuizViewer />} />
                <Route path="/courseEdition/:courseId" element={<CourseEdition />} />
                <Route path="/courseEditionModule/:courseId" element={<CourseEditionModule />} />
                <Route path="/metrics" element={<Metrics />} />
                {/* Adicionando a nova rota de Certificado */}
                <Route path="/certificate/:courseId" element={<Certificate />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
