import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function SignupForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, name, value, type } = e.target;
        if (type === 'radio') {
            setFormData(prevState => ({
                ...prevState,
                userType: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    userType: formData.userType
                }),
            });
    
            if (response.ok) {
                navigate('/signin');
            } else {
                const errorText = await response.text();
                alert(`Failed to create user: ${errorText}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        }
    };        

    const handleLoginRedirect = () => {
        navigate('/signin');
    };

    return (
        <form className="rounded-lg w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="w-full md:w-1/2">
                    <label className="font-gnosi block text-white mb-2" htmlFor="firstName">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                    />
                </div>
                <div className="w-full md:w-1/2">
                    <label className="font-gnosi block text-white mb-2" htmlFor="lastName">
                        Sobrenome
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="font-gnosi block text-white mb-2" htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                />
            </div>

            <div className="mt-4">
                <label className="font-gnosi block text-white mb-2" htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                />
            </div>

            <div className="mt-4">
                <label className="font-gnosi block text-white mb-2" htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                />
            </div>

            <div className="font-gnosi mt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-2 md:mb-0">
                    <input
                        type="radio"
                        id="TEACHER"
                        name="userType"
                        value="TEACHER"
                        checked={formData.userType === 'TEACHER'}
                        onChange={handleChange}
                        className="form-radio w-6 h-6 text-primarypurple border-2 border-white"
                    />
                    <label htmlFor="TEACHER" className="ml-4 text-lg text-white">Professor</label>
                </div>
                <div className="flex items-center pr-5">
                    <input
                        type="radio"
                        id="STUDENT"
                        name="userType"
                        value="STUDENT"
                        checked={formData.userType === 'STUDENT'}
                        onChange={handleChange}
                        className="form-radio w-6 h-6 text-primarypurple border-2 border-white"
                    />
                    <label htmlFor="STUDENT" className="ml-4 text-lg text-white">Aluno</label>
                </div>
            </div>

            <div className="mt-4 flex justify-center items-center">
                <span className="text-white cursor-pointer" onClick={handleLoginRedirect}>
                    Já possui conta? Entrar</span>
            </div>

            <div className="font-gnosi mt-6 md:mt-8">
                <button
                    type="submit"
                    className="cadastro-button w-full p-4 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
                >
                    Cadastrar
                </button>
            </div>
        </form>
    );
}