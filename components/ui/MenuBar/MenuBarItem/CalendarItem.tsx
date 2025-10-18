import { useEffect, useState } from 'react';

export default function CalendarItem() {
    const [calendarString, setCalendarString] = useState('');

    useEffect(() => {
        const updateCalendarString = () => {
            const today = new Date();
            const weekday = today.toLocaleString('en-US', { weekday: 'long' });
            const month = today.toLocaleString('en-US', { month: 'short' });
            const day = today.getDate();
            const time = today.toLocaleTimeString('en-US', { hour12: false });
            setCalendarString(`${weekday} ${month} ${day}, ${time}`);
        };

        updateCalendarString();
        const interval = setInterval(updateCalendarString, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="menu-bar-item">
            <span className="menu-bar-item-name">{calendarString}</span>
        </div>
    );
}