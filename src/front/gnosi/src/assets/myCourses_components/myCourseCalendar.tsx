import React from 'react';

const MyCourseCalendar: React.FC = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth(); 
    const currentYear = today.getFullYear();

    const lastTwoDays = [];
    for (let i = 2; i >= 1; i--) {
        const date = new Date(currentYear, currentMonth, currentDate - i);
        lastTwoDays.push({
            day: date.getDate(),
            weekday: date.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase(),
        });
    }

    const nextDays = [];
    for (let i = 1; i <= 2; i++) {
        const date = new Date(currentYear, currentMonth, currentDate + i);
        nextDays.push({
            day: date.getDate(),
            weekday: date.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase(),
        });
    }

    return (
        <div className="flex flex-col items-center p-4 rounded-lg  ">
            <h2 className="text-3xl text-white font-bold">{`${today.toLocaleString('pt-BR', { month: 'short' }).toUpperCase()} ${currentYear}`}</h2>
            <div className="flex mt-2">
                {lastTwoDays.map((item) => (
                    <div key={item.day} className="text-center text-white text-xl mx-2">
                        <div>{item.weekday}</div>
                        <div>{item.day}</div>
                    </div>
                ))}
                <div id='currentDate' className="text-center text-xl mx-2">
                    <div className="font-bold ">{today.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase()}</div>
                    <div className="font-bold ">{currentDate}</div>
                </div>
                {nextDays.map((item) => (
                    <div key={item.day} className="text-center text-white text-xl mx-2">
                        <div>{item.weekday}</div>
                        <div>{item.day}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyCourseCalendar;
