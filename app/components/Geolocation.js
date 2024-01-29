"use client";

import { useEffect, useState } from 'react';


export default function Home(props) {
    // const country = props.searchParams.country;
    const [location, setLocation] = useState(null);
    const [nearSchool, setNearSchool] = useState(false);
    // 49.2009066703143, -0.3500462865054514
    const schoolLatitude = 49.2009066703143;
    const schoolLongitude = -0.3500462865054514;
    const maxDistance = 0.5;

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;



            setLocation({ latitude, longitude });

            const distance = calculateDistance(latitude, longitude, schoolLatitude, schoolLongitude);
            console.log(distance);

            if (distance <= maxDistance) {
                console.log('Vous êtes à moins de 500 mètres de l\'école');
                setNearSchool(true);
            }
            else {
                console.log('Vous êtes à plus de 500 mètres de l\'école');
                setNearSchool(false);
            }

        }, (error) => {
            console.log(error);
        }
        )
    }, [])

    console.log(location);

    // Fonction pour calculer la distance entre deux points
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Rayon de la Terre en kilomètres
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance en kilomètres
        return distance;
    }

    // Fonction pour convertir les degrés en radians
    function toRad(degrees) {
        return degrees * (Math.PI / 180);
    }


    return (
        <div className={`border rounded-lg px-4 py-3 ${nearSchool ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
            <h1 className='block rounded-lg text-base font-semibold leading-7 text-gray-900'>Géocalisation</h1>
            <p role="alert">Vous êtes à {nearSchool ? 'moins de 500 mètres' : 'plus de 500 mètres'} de l'école</p>
            <p role="alert">Coordonnées : {location && `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</p>
        </div>
    );

}
