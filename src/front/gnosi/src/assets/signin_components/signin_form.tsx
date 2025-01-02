import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SigninForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });
    
      if (response.ok) {
        navigate('/home');
      } else {
        alert('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <form className="rounded-lg w-full" onSubmit={handleSubmit}>
      {/* E-mail */}
      <div className="mt-4">
        <label className="font-gnosi block text-white mb-2" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      {/* Senha */}
      <div className="mt-4">
        <label className="font-gnosi block text-white mb-2" htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      {/* Pergunta "não tem conta" */}
      <div className="mt-4 flex justify-center items-center">
        <span className="text-white cursor-pointer" onClick={handleSignupRedirect}>
          Não possui uma conta? Cadastrar
        </span>
      </div>
      {/* Botão de Acesso */}
      <div className="font-gnosi mt-6 md:mt-8">
        <button
          type="submit"
          className="w-full p-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
        >
          Acessar
        </button>
      </div>
    </form>
  );
}