import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';

type Comment = {
  id: string;
  content: string;
  user: {
    userId: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  parentComment: Comment | null;
};

const Comment: React.FC<{ courseId: string | undefined }> = ({ courseId }) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [replyContent, setReplyContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!courseId) {
      console.error('O courseId não foi encontrado.');
      return;
    }

    fetch(`http://localhost:8080/api/comments/course/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar comentários:", error);
      });
  }, [courseId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          content: newComment,
          parentCommentId: null,
        }),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao adicionar comentário ou usuário não autenticado');
          }
          return response.json();
        })
        .then((data) => {
          setComments((prev) => [...prev, data]);
          setNewComment('');
        })
        .catch((error) => {
          console.error("Erro ao adicionar comentário:", error);
        });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    fetch(`http://localhost:8080/api/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao excluir comentário ou usuário não autorizado');
        }
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error("Erro ao excluir comentário:", error);
        alert("Erro ao excluir o comentário.");
      });
  };

  const handleOpenReplyModal = (parentId: string) => {
    setParentCommentId(parentId);
    setIsModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setParentCommentId(null);
    setReplyContent('');
    setIsModalOpen(false);
  };

  const handleReplyComment = () => {
    if (replyContent.trim() && parentCommentId) {
      fetch('http://localhost:8080/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          content: replyContent,
          parentCommentId: parentCommentId,
        }),
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao responder comentário ou usuário não autenticado');
          }
          return response.json();
        })
        .then((data) => {
          setComments((prev) => [...prev, data]);
          setReplyContent('');
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Erro ao responder comentário:", error);
        });
    }
  };

  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (comments: Comment[]) => {
    const mainComments = comments.filter((comment) => comment.parentComment === null);

    return mainComments.map((comment) => (
      <div key={comment.id} className="p-1">
        <div className="flex justify-between items-center bg-[#1F1D35] rounded-lg p-4">
          <div>
            <span className="font-bold text-white">{comment.user.firstName} {comment.user.lastName}</span>
            <p className=" text-gray-400">{comment.content}</p>
            <button
              onClick={() => toggleRepliesVisibility(comment.id)}
              className="bg-gray-600 hover:bg-gray-800 mt-2 px-2 py-1 text-white rounded-xl"
            >
              {visibleReplies[comment.id] ? 'Esconder Respostas' : 'Ver Respostas'}
            </button>
          </div>
          <div className="flex space-x-2">
            {userId === comment.user.userId && (
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="hover:bg-transparent text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            )}
            <button onClick={() => handleOpenReplyModal(comment.id)} className="bg-purple-600 hover:bg-purple-800 p-1 text-white rounded-xl">
              Responder
            </button>
          </div>
        </div>

        {visibleReplies[comment.id] && (
          <div className="ml-2">
            {comments
              .filter((reply) => reply.parentComment?.id === comment.id)
              .map((reply) => (
                <div key={reply.id} className="p-1">
                  <div className="flex justify-between bg-[#1F1D35] rounded-lg items-center p-2">
                    <div>
                      <span className="font-bold text-white">{reply.user.firstName} {reply.user.lastName}</span>
                      <p className=" text-gray-400">{reply.content}</p>
                    </div>
                    <div className="flex space-x-2">
                      {userId === reply.user.userId && (
                        <button
                          onClick={() => handleDeleteComment(reply.id)}
                          className="hover:bg-transparent text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Comentários</h2>

      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          placeholder="Adicione um comentário..."
          className="p-2 rounded-md text-white"
          style={{
            backgroundColor: '#1F1D35',
            borderColor: '#AA47F0',
            borderWidth: '1px',
            boxShadow: 'none',
            resize: 'none',
            width: '42em',
          }}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
        >
          Comentar
        </button>
      </div>

      <div>
        {renderComments(comments)}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1F1D35] p-6 rounded-md w-96">
            <h3 className="font-bold text-lg text-white mb-4">Responder Comentário</h3>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Escreva sua resposta..."
              className="p-2 w-full rounded-md text-white"
              style={{
                backgroundColor: '#1F1D35',
                borderColor: '#AA47F0',
                borderWidth: '2px',
                boxShadow: 'none',
                resize: 'none',
              }}
              rows={4}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCloseReplyModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleReplyComment}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
              >
                Responder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
