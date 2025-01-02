import React, { useState } from 'react';
import HomeCourseList from '../home_components/homeCourseList';
import '../../styles/home.css';

const HomeDashboard: React.FC = () => {
    const allCategories = ['Todos', 'FrontEnd', 'BackEnd', 'FullStack', 'Mobile', 'DevOps', 'Design', 'Marketing', 'Inovação', 'Gestão', 'Empreendedorismo'];
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const [visibleCategories, setVisibleCategories] = useState<string[]>(['Todos', 'FrontEnd', 'BackEnd', 'DevOps']);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);


    const toggleSelect = () => {
        setIsSelectOpen((prev) => !prev);
    };

    const handleCategorySelect = (category: string) => {
        const updatedCategories = [...visibleCategories];
        updatedCategories[updatedCategories.length - 1] = category;

        setVisibleCategories(updatedCategories);
        setSelectedCategory(category);
        setIsSelectOpen(false);
    };

    const remainingCategories = allCategories.filter((category) => !visibleCategories.includes(category));

    return (
        <div className="flex p-4">
            <div className="flex-1">
                <div id="courseCategories" className="flex gap-2 flex-wrap items-center">
                    {visibleCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-button ${selectedCategory === category ? 'bg-transparent hover:bg-transparent text-2xl underline text-purple-500 font-bold' : 'bg-transparent hover:bg-transparent text-2xl text-[#474747] font-bold'
                                } px-4 py-2 rounded-xl`}
                        >
                            {category}
                        </button>
                    ))}

                    <div className="relative">
                        <button
                            onClick={toggleSelect}
                            className="bg-purple-600 hover:bg-purple-800 text-white font-bold px-2 py-2 rounded-xl"
                        >
                            Ver mais
                        </button>

                        {isSelectOpen && (
                            <div className="absolute z-10 bg-white shadow-md rounded-lg mt-2 p-2 w-48">
                                {remainingCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className="block w-full text-left px-3 py-2 hover:bg-purple-600 hover:text-white rounded-lg"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <HomeCourseList selectedCategory={selectedCategory} />
            </div>
        </div>
    );
};

export default HomeDashboard;