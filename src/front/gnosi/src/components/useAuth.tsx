import { useState, useEffect } from 'react';

const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null); 
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetch('http://localhost:8080/auth/check-session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return fetch('http://localhost:8080/auth/current-user', {
            method: 'GET',
            credentials: 'include',
          });
        } else {
          throw new Error('Sessão expirada ou não autenticada');
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Falha ao obter o usuário atual');
        }
      })
      .then((userId) => {
        setUserId(userId);

        return fetch('http://localhost:8080/auth/current-user-type', {
          method: 'GET',
          credentials: 'include',
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Falha ao obter o tipo de usuário');
        }
      })
      .then((userType) => {
        setUserType(userType);
      })
      .catch((error) => {
        console.error('Erro ao verificar a sessão ou usuário:', error);
        setUserId(null);
        setUserType(null); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setUserId(null);
        alert("Deslogado com sucesso!");
      } else {
        alert("Falha ao deslogar. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      alert("Ocorreu um erro durante o logout.");
    }
  };

  return { userId, loading, logout, userType };
};

export default useAuth;
