import React from 'react';

interface MyCourseActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onView: () => void;
    onEdit: () => void;
}

const MyCourseActionModal: React.FC<MyCourseActionModalProps> = ({ isOpen, onClose, onView, onEdit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#1F1D35' }}>
                <h2 className="text-xl font-bold mb-4 text-center text-white">Escolha uma ação</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={onView}
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
                    >
                        Visualizar
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-800"
                    >
                        Editar
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCourseActionModal;