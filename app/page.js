"use client";

import Image from 'next/image'
import { useEffect, useState } from 'react';

// export const getStaticProps = ({ query }) => ({
//   props: query
// })

export default function Home(props) {
  // const country = props.searchParams.country;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });

    }, (error) => {
      console.log(error);
    }
    )
  }, [])

  console.log(location);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bonjourz</h1>
      {/* <p>Country : {country}</p> */}
      <p>Location : {location && `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</p>

    </main>
  )
}
