import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from '../components/useAuth';
import { Footer } from '../components/Footer';
import '../styles/certificate.css'; // Importe o arquivo CSS

export function Certificate() {
    const { userId } = useAuth();
    const location = useLocation();
    const { course } = location.state;
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar os dados do usuário');
                }

                const data = await response.json();
                const { firstName, lastName } = data;
                setUserName(`${firstName} ${lastName}`);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="certificate-container">
            <div className="certificate-content mt-12">
                <div className="max-w-3xl w-full text-center bg-white p-8 rounded-md shadow-lg mb-12">
                    <div className="flex justify-center items-center mb-4">
                        <img src="../src/assets/GNOSI.png" alt="Gnosi Logo" className="h-12 mr-4" />
                        <h2 className="text-3xl font-bold">Certificado de Conclusão</h2>
                    </div>
                    <p className="text-xl mb-8">Parabéns, {userName}!</p>
                    <p className="text-lg mb-8">
                        Você completou o curso <span className="font-semibold">{course.name}</span> com sucesso.
                    </p>
                    <div className="border-t-2 border-gray-200 mt-8 pt-8">
                        <p className="text-lg mb-4">Curso: {course.name}</p>
                        <p className="text-lg mb-4">Descrição: {course.description}</p>
                        <p className="text-lg mb-4">Categoria: {course.category}</p>
                    </div>
                    <div className="mt-8">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#AA47F0',
                                padding: '12px 24px',
                                color: 'white',
                                fontFamily: 'Chakra Petch',
                            }}
                            onClick={() => window.print()} // Função para imprimir o certificado
                        >
                            Imprimir Certificado
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}