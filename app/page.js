"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';

// export const getStaticProps = ({ query }) => ({
//   props: query
// })

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bonjourz</h1>
      {/* <p>Country : {country}</p> */}
      <p>Location : {location && `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</p>
      <p>Near School :
        {nearSchool ?
          <span className="text-green-500">Vous êtes à moins de 500 mètres de l'école</span>
          :
          <span className="text-red-500">Vous êtes à plus de 500 mètres de l'école</span>
        }
      </p>

    </main>
  )
}
