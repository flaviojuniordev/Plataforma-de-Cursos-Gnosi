import '../styles/NavBar.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/useAuth';

interface NavbarProps {
  userName: string | null;
}

export function Navbar({ userName }: NavbarProps) {
  const { userId, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string | null>(userName);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.firstName);

          const imageResponse = await fetch(`http://localhost:8080/users/${userId}/profile-picture`);
          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setUserImage(imageUrl);
          } else {
            console.error("Erro ao carregar a imagem");
          }
        } else {
          const errorData = await response.json();
          alert(`Falha ao carregar os dados do usuário: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
        alert("Ocorreu um erro ao carregar os dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && userId) {
      fetchUserData();
    }
  }, [userId, authLoading]);

  const handleLoginRedirect = () => {
    navigate('/signin');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
      <nav className="navbar">
        <div className="search-container">
          <input
              type="text"
              placeholder="Pesquisar..."
              className="p rounded-full bg-gray-700 w-96 h- bg-purple-500 font-gnosi"
              style={{ backgroundColor: '#ECE6F014' }}
          />
        </div>

        <div className="navbar-items">
          {!userId ? (
              <button onClick={handleLoginRedirect} id="login-button" className="login-button">
                Login
              </button>
          ) : (
              <>
                {isLoading ? (
                    <span className="user-name">Carregando...</span>
                ) : (
                    <div className="flex items-center space-x-3">
                    {userImage && <img src={userImage} alt="User" className="w-10 h-10 rounded-full" />}
                    <span className="user-name bordered-text">Bem-vindo, {name}</span>
                  </div>
                )}

                <button onClick={handleLogout} className="navbar-button"
                        style={{ backgroundColor: 'transparent', color: 'white', padding: '10px' }}>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                  >
                    <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5.5 0 0 0 9.5 2h-8A1.5.5 0 0 0 0 3.5v9A1.5.5 0 0 0 1.5 14h8a1.5.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </button>
              </>
          )}
        </div>
      </nav>
  );
}
