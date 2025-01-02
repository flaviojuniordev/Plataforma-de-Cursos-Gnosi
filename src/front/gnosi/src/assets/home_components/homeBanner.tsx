import React from 'react';
import gnosiHomeHeader from '../../assets/GNOSI-home-header.png'; // Ajuste o caminho conforme necessário
import "../../styles/home.css";

const GnosiBanner: React.FC = () => {
    return (
        <div
            id="Banner-Container"
            className="relative max-w-screen-lg mx-auto p-4 sm:p-10 "
            style={{ maxHeight: '400px' }}
        >
            <img
                id="HomeBannerImage"
                src={gnosiHomeHeader}
                alt="Gnosi Home Header"
                className="w-full h-full object-cover rounded-3xl"
                style={{ maxHeight: '300px' }}
            />
            <div className="absolute inset-0 flex items-center justify-start pl-20 w-1/2 ">
                <h1
                    id="HomeBannerText"
                    className="text-white text-3xl sm:text-3xl md:text-5xl font-bold" // Aumentado o tamanho do texto
                >
                    Cursos online gratuitos <br></br>para todas as áreas!
                </h1>
            </div>

        </div>
    );
};

export default GnosiBanner;