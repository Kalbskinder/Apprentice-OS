"use client"

import { useEffect, useState } from "react";
// @ts-ignore
import "./LockScreen.css"

export default function LockScreen() {
    const formatDate = (d: Date) => {
        const day = d.getDate();
        const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(d);
        return `${day}. ${monthYear}`;
    };

    const [time, setTime] = useState(() => new Date().toLocaleTimeString());
    const [date, setDate] = useState(() => formatDate(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            setDate(formatDate(now));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <div className="lock-screen-bg"></div>    
            <div className="lock-screen">
                <div className="lock-clock">
                    <div className="time">{time}</div>
                    <div className="date">{date}</div>
                </div>
                <div className="input-prompt">Press [Space] to continue</div>
            </div>
        </div>
    )
}