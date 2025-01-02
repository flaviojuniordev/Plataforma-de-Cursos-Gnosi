import React, { useState, useEffect } from 'react';
import '../styles/userProfile.css';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Aside } from '../components/Aside';
import Figure from '../components/Figure';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  password: string;
  profilePicture: string;
  userId: string;
}

export function UserProfile() {
  const navigate = useNavigate();
  const { userId, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File | null>(null);
  const [originalData, setOriginalData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: '',
    profilePicture: '',
    userId: ''
  });
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    password: '',
    profilePicture: '',
    userId: ''
  });

  const handleProfilePictureChange = (file: File) => {
    setSelectedProfilePicture(file);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (response.ok) {
          const data: UserData = await response.json();
          setUserData(data);
          setOriginalData(data);

          const imageResponse = await fetch(`http://localhost:8080/users/${userId}/profile-picture`);
          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setUserData(prevData => ({ ...prevData, profilePicture: imageUrl }));
          } else {
            console.error('Failed to load profile picture');
          }
        } else {
          const errorData = await response.json();
          alert(`Failed to load user data: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while loading user data");
      }
    };

    if (!authLoading && userId) {
      fetchUserData();
    }
  }, [userId, authLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleDeleteConta = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmDelete) return;

    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert("Conta deletada com sucesso!");
        navigate('/signin');
      } else {
        alert("Erro ao deletar a conta.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Ocorreu um erro ao tentar deletar a conta.");
    }
  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    if (selectedProfilePicture) {
      formData.append('profilePicture', selectedProfilePicture);
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${userData.userId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        window.location.reload(); // Recarrega a página após salvar com sucesso
      } else {
        alert('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil', error);
      alert('Ocorreu um erro ao salvar as informações');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        alert("Logged out successfully");
        navigate('/signin');
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert("An error occurred during logout.");
    }
  };

  return (
      <div>
        <Navbar userName={userData.firstName} />
        <div className="flex flex-row">
          <Aside />
          <main className="flex-1 flex flex-col items-center pt-12 p-8">
            <div className="bg-cardcolor w-full max-w-[640px] rounded-lg shadow-lg p-8">
              <div className="mt-8 flex flex-col gap-4">
                <Figure onProfilePictureChange={handleProfilePictureChange} profilePicture={userData.profilePicture} isEditing={isEditing} />
                <div>
                  <label className="font-gnosi block text-white mb-2">Nome Completo</label>
                  <input
                      type="text"
                      id="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none"
                      disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="font-gnosi block text-white mb-2">Sobrenome</label>
                  <input
                      type="text"
                      id="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none"
                      disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="font-gnosi block text-white mb-2">E-mail</label>
                  <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleChange}
                      className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none"
                      disabled={!isEditing}
                  />
                </div>
                <div className="relative">
                  <label className="font-gnosi block text-white mb-2">Senha</label>
                  <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      value={userData.password}
                      onChange={handleChange}
                      className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none"
                      disabled={!isEditing}
                  />
                  <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-11 text-gray-300  hover:bg-transparent "
                  >
                    {isPasswordVisible ? (
                        <svg className="text-purple-500"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                             width="24"
                             height="24"
                        >
                          <path
                              d="M12 4.5C7.305 4.5 3.135 7.61 1.5 12c1.635 4.39 5.805 7.5 10.5 7.5s8.865-3.11 10.5-7.5C20.865 7.61 16.695 4.5 12 4.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7.5c-1.655 0-3 1.345-3 3s1.345 3 3 3 3-1.345 3-3-1.345-3-3-3z"/>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                          <path
                              d="M12 4.5C7.305 4.5 3.135 7.61 1.5 12c1.635 4.39 5.805 7.5 10.5 7.5s8.865-3.11 10.5-7.5C20.865 7.61 16.695 4.5 12 4.5zm0 12c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7.5c-1.655 0-3 1.345-3 3s1.345 3 3 3 3-1.345 3-3-1.345-3-3-3z"/>
                          <path d="M12 9c-1.655 0-3 1.345-3 3s1.345 3 3 3 3-1.345 3-3-1.345-3-3-3z"/>
                        </svg>

                    )}
                  </button>
                </div>
                <div>
                  <label className="font-gnosi block text-white mb-2">Tipo de Usuário</label>
                  <input
                      type="text"
                      value={userData.userType}
                      className="font-gnosi w-full p-3 rounded-xl bg-transparent border border-gray-500 text-gray-300 placeholder-gray-500 focus:outline-none"
                      disabled
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="font-gnosi w-full p-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                >
                  {isEditing ? "Salvar" : "Editar Perfil"}
                </button>
                {isEditing && (
                    <button
                        onClick={handleCancel}
                        className="font-gnosi w-full p-4 mt-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
                    >
                      Cancelar
                    </button>
                )}
              </div>
              <div className="mt-4 text-center">
                <button onClick={handleDeleteConta} className="font-gnosi text-purple-400 hover:underline">
                  Apagar Conta
                </button>
              </div>
              <div className="mt-2 text-center">
                <button onClick={handleLogout} className="font-gnosi text-purple-400 hover:underline">
                  Sair da conta
                </button>
              </div>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
  );
}