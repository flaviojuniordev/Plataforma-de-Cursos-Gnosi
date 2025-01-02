import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {Typography} from "@mui/material";

function CourseCreationForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState<File | null>(null);
  const [category, setCategory] = useState<{ value: string; label: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    { value: 'front-end', label: 'FrontEnd' },
    { value: 'back-end', label: 'BackEnd' },
    { value: 'full-stack', label: 'FullStack' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'dev-ops', label: 'DevOps' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'gestao', label: 'Gestão' },
    { value: 'inovacao', label: 'Inovação' },
    { value: 'empreendedorismo', label: 'Empreendedorismo' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category.length > 0 ? category[0].label : '');

    if (imagePath) {
        formData.append('imagePath', imagePath);
    }

    formData.append('lessons', JSON.stringify([
        {
            title: "Introdução ao Java",
            videoLink: "http://link-do-video-1.com"
        },
        {
            title: "Estruturas de Dados em Java",
            videoLink: "http://link-do-video-2.com"
        }
    ]));

    try {
      const response = await fetch('http://localhost:8080/courses', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const createdCourseId = await response.text(); // Supondo que a resposta seja uma string simples contendo o ID do curso
        console.log('Created Course ID:', createdCourseId);

        navigate('/courseCreationModule', { state: { courseId: createdCourseId } });
      } else {
        throw new Error('Erro ao criar o curso');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };


  return (
    <div className="container">
      <div className="bg-cardcolor w-full max-w-[640px] rounded-lg shadow-lg p-8">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column',}}>
          <Typography variant="h6" sx={{fontFamily: 'Chakra Petch', color: 'white', fontSize: '20px'}}>
            Criar Curso
          </Typography>

          {error && (
              <div className="text-red-500 error-message">
                {error}
              </div>
          )}
        </div>
        <form className="rounded-lg w-full" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="font-gnosi block text-white mb-2" htmlFor="name">
              Nome do curso
            </label>
            <input
                className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                type="text"
                id="name"
                name="name"
                placeholder="Digite o nome do curso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          <div className="form-group mt-4">
            <label className="font-gnosi block text-white mb-2" htmlFor="description">
              Descrição
            </label>
            <textarea
                className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                id="description"
                name="description"
                placeholder="Digite a descrição do curso"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
          </div>
          <div className="form-group">
            <label className="font-gnosi block text-white mb-2" htmlFor="category">
              Categoria
            </label>
            <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'transparent',
                    border: '1px solid #AA47F0',
                    color: '#6B7280',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    boxShadow: state.isFocused ? 'none' : provided.boxShadow,
                    '&:hover': {
                      borderColor: '#AA47F0',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#AA47F0' : 'transparent',
                    color: state.isSelected ? '#fff' : '#6B7280',
                    '&:hover': {
                      backgroundColor: '#AA47F0',
                      color: '#fff',
                    },
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: '#6B7280',
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: '#6B7280',
                  }),
                }}
                id="category"
                isMulti
                options={options}
                className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                value={category}
                onChange={(selectedOptions) => setCategory(selectedOptions as { value: string; label: string }[])}
            />
          </div>
          <div className="form-group">
            <label className="font-gnosi block text-white mb-2" htmlFor="image">
              Imagem Do Curso
            </label>
            <input
                type="file"
                id="image"
                name="image"
                className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-purple-500"
                onChange={(e) => {
                  if (e.target.files) {
                    setImagePath(e.target.files[0]);
                  }
                }}
            />
          </div>
          <button
              type="submit"
              className="font-gnosi w-full p-3 mt-4 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
          >
            Avançar para a criação dos módulos
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseCreationForm;