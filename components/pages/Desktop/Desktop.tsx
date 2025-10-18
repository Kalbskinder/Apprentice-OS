"use client";
import MenuBar from '@/components/ui/MenuBar/MenuBar';
// @ts-ignore
import './Desktop.css';

export default function Desktop() {
    return (
        <div className='desktop'>
            <div className="desktop-bg"></div>  
            <MenuBar />  
        </div>
    );
}