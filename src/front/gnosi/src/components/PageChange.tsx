import React from 'react';

interface PageChangeProps {
    currentPage: number;
    totalPages: number;
    totalCourses: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

const PageChange: React.FC<PageChangeProps> = ({ currentPage, totalPages, totalCourses, onPreviousPage, onNextPage }) => {
    const coursesPerPage = 5;
    const startCourse = (currentPage - 1) * coursesPerPage + 1;
    const endCourse = Math.min(currentPage * coursesPerPage, totalCourses);

    return (
        <div className="flex items-center rounded-md justify-between" style={{ backgroundColor: '#1F1D35', padding: '1rem 1.5rem', marginTop: '5rem' }}>
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={onPreviousPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-md border border-white bg-[#1F1D35] px-4 py-2 text-white text-lg font-medium hover:bg-blue-600"
                >
                    Previous
                </button>
                <button
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-white bg-[#1F1D35] px-4 py-2 text-white text-lg font-medium hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-lg text-white">
                        Mostrando <span className="font-medium">{startCourse}</span> a <span className="font-medium">{endCourse}</span> de <span className="font-medium">{totalCourses}</span> resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={onPreviousPage}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white border border-white bg-[#1F1D35] text-lg hover:bg-purple-600 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => console.log(`Go to page ${index + 1}`)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-white ${currentPage === index + 1 ? 'bg-purple-600 text-white' : 'text-white hover:bg-purple-600'}`}
                                style={{ backgroundColor: currentPage === index + 1 ? '#1F1D35' : '#1F1D35', color: currentPage === index + 1 ? '#AA47F0' : 'white', fontSize: '1rem' }}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={onNextPage}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white border border-white bg-[#1F1D35] text-lg hover:bg-purple-600 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default PageChange;