import { useState, useEffect } from 'react';
import { Typography, List, Snackbar } from '@mui/material';
import { useParams } from 'react-router-dom';

const modalStyle = {
  flex: 1,
  maxWidth: '500px',
  backgroundColor: '#1F1D35',
  borderRadius: '8px',
  padding: '16px',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  marginRight: '200px',
};

const moduleListStyle = {
  flex: 1,
  maxWidth: '500px',
  backgroundColor: '#171529',
  borderRadius: '8px',
  padding: '16px',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  overflow: 'auto',
  maxHeight: '80vh',
};


function CourseEditionModuleForm() {
  const { courseId } = useParams<{ courseId: string }>();
  const [modules, setModules] = useState<{ id: string; name: string; description: string; lessons: { lessonId: string; title: string; videoLink: string }[] }[]>([]);
  const [lessons, setLessons] = useState<{ lessonId?: string; title: string; videoLink: string }[]>([]);
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [moduleLink, setModuleLink] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`http://localhost:8080/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.modules)) {
            setModules(data.modules.map((mod: { moduleId: string;[key: string]: any }) => ({
              ...mod,
              id: mod.moduleId,
            })));
          } else {
            console.error('Módulos não encontrados ou resposta inválida');
          }
        } else {
          console.error('Erro ao buscar módulos');
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const handleAddLesson = async () => {
    if (!editingModuleId) {
      console.error('Nenhum módulo selecionado para adicionar aula');
      return;
    }

    const newLesson = { title: lessonTitle, videoLink: moduleLink };

    try {
      const response = await fetch(`http://localhost:8080/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: lessonTitle,
          videoLink: moduleLink,
          moduleId: editingModuleId,
        }),
      });

      if (response.ok) {
        const savedLesson = await response.json();
        setLessons((prevLessons) => [...prevLessons, { ...newLesson, lessonId: savedLesson.lessonId }]);
        setLessonTitle('');
        setModuleLink('');
        setSnackbarMessage('Aula adicionada com sucesso!');
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error('Erro ao adicionar a aula');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleRemoveLesson = async (index: number, lessonId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLessons(lessons.filter((_, i) => i !== index));
        setSnackbarMessage('Aula removida com sucesso!');
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error('Erro ao remover a aula');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: moduleName,
      description: moduleDescription,
      lessons,
      courseId,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/modules${isEditing ? `/${editingModuleId}` : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSnackbarMessage(isEditing ? 'Módulo alterado com sucesso!' : 'Novo módulo adicionado com sucesso!');
        setSnackbarOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error('Erro ao salvar o módulo');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleEdit = (module: { id: string; name: string; description: string; lessons: { lessonId: string; title: string; videoLink: string }[] }) => {
    setModuleName(module.name);
    setModuleDescription(module.description);
    setLessons(module.lessons || []);
    setEditingModuleId(module.id);
    setIsEditing(true);
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/modules/${moduleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setModules(modules.filter((mod) => mod.id !== moduleId));
        setSnackbarMessage('Módulo excluído com sucesso!');
        setSnackbarOpen(true);
      } else {
        console.error('Erro ao deletar módulo');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const resetForm = () => {
    setModuleName('');
    setModuleDescription('');
    setLessons([]);
    setLessonTitle('');
    setModuleLink('');
    setEditingModuleId(null);
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      {/* Modal de Criação/Edição */}
      <div className="bg-cardcolor w-full max-w-[640px] rounded-lg shadow-lg p-8" style={modalStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Chakra Petch', color: 'white', fontSize: '20px' }}>
            {isEditing ? 'Editar módulo existente' : 'Criar novo módulo'}
          </Typography>
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
                {isEditing ? 'Salvar Alterações' : 'Criar Módulo'}
              </button>
            </div>
          </div>

          <div className="form-group mb-4">
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={resetForm}
                className="font-gnosi w-[48%] p-3 mt-2 rounded-xl bg-purple-500 text-white hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>

        <List>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="mb-4 bg-white p-3 rounded-lg shadow-sm"
            >
              <p className="font-semibold">{lesson.title}</p>
              <p className="text-sm text-gray-800">{lesson.videoLink}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleRemoveLesson(index, lesson.lessonId!)}
                  className="bg-red-500 text-white text-sm py-1 px-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </List>
      </div>

      {/* Lista de Módulos e Aulas */}
      <div style={moduleListStyle}>
        <div className="mb-4">
          <h6 className="text-xl font-semibold mb-2">Módulos e Aulas</h6>
          <List>
            {modules.map((module) => (
              <div key={module.id} className="mb-4 text-black shadow-lg rounded-lg p-4" style={{ backgroundColor: '#1F1D35' }}>
                <h6 className="text-lg text-white mb-1 font-semibold">{module.name}</h6>
                <p className="text-sm text-white mb-3">{module.description}</p>
                <List className="mt-4">
                  {module.lessons &&
                    module.lessons.map((lesson, index) => (
                      <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-semibold">{lesson.title}</p>
                        <p className="text-sm text-gray-800">{lesson.videoLink}</p>
                      </div>
                    ))}
                </List>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
                    onClick={() => handleEdit(module)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
                    onClick={() => handleDeleteModule(module.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </List>
        </div>
      </div>

      {/* Snackbar de Mensagem */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default CourseEditionModuleForm;
