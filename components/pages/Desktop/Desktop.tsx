"use client";
import MenuBar from '@/components/ui/MenuBar/MenuBar';
// @ts-ignore
import './Desktop.css';
import DesktopBackground from './DesktopBackground';

export default function Desktop() {
    return (
        <div className='desktop'>
            <DesktopBackground />
            <MenuBar />
        </div>
    );
}