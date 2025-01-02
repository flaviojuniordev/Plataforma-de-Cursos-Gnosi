import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

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

const CourseEditionForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePath, setImagePath] = useState<File | null>(null);
  const [category, setCategory] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/courses/${courseId}`, {
          credentials: 'include',
        });
        if (response.ok) {
          const course = await response.json();
          setName(course.name);
          setDescription(course.description);
          setCategory([{ value: course.category, label: course.category }]);
        } else {
          console.error('Failed to fetch course');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category.length > 0 ? category[0].label : '');

    if (imagePath) {
      formData.append('imagePath', imagePath);
    }

    try {
      const response = await fetch(`http://localhost:8080/courses/${courseId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const updatedCourseId = await response.text();
        console.log('Updated Course ID:', updatedCourseId);

        navigate('/myCourses', { state: { courseId: updatedCourseId } });
      } else {
        throw new Error('Failed to update course');
      }
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  const handleEditModules = () => {
    navigate(`/courseEditionModule/${courseId}`);
  };

  const handleDeleteCourse = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${courseId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Curso excluído com sucesso!');
        navigate('/myCourses');
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir o curso: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro ao excluir o curso:', error);
      alert('Ocorreu um erro ao excluir o curso');
    }
  };

  return (
      <div className="container">
        <div className="bg-cardcolor w-full max-w-[640px] rounded-lg shadow-lg p-8">
          <h1 className="font-gnosi block text-white mb-2">Editar curso</h1>
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
              Salvar Edição
            </button>
          </form>
          <button
              onClick={handleEditModules}
              className="font-gnosi w-full p-3 mt-4 rounded-xl bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Editar Módulos
          </button>
          <button
              onClick={handleDeleteCourse}
              className="font-gnosi w-full p-3 mt-4 rounded-xl bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
          >
            Excluir Curso
          </button>
        </div>
      </div>
  );
};

export default CourseEditionForm;