"use client";

import Header from '../components/Header';
import Geolocation from '../components/Geolocation';

export default function HomeLayout({ children }) {
    return <div className='bg-[url(/mountain-background.jpg)]'>
        <Header>
            <Geolocation />
        </Header>
        {children}
    </div>;
}
