"use client";

import { useEffect, useState } from 'react';
import QuestList from '../components/QuestList';
import CodeReader from '../components/CodeReader';
import PhotoCapture from '../components/PhotoCapture';

export default function Home() {
    const [quetes, setQuetes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Vérifie si l'application est ouverte sur un appareil de bureau
        const isDesktopQuery = window.matchMedia('(min-width: 768px)');

        // Met à jour l'état selon le résultat de la requête
        setIsDesktop(!isDesktopQuery.matches);

        // Ajoute un écouteur pour détecter les changements de taille de l'écran
        const handleResize = () => {
            setIsDesktop(!isDesktopQuery.matches);
        };
        isDesktopQuery.addEventListener('change', handleResize);

        // Nettoie l'écouteur lors du démontage du composant
        return () => {
            isDesktopQuery.removeEventListener('change', handleResize);
        };
    }, []);

    const [decodedValue, setDecodedValue] = useState("");

    const handleResult = (result) => {
        setDecodedValue(result);
    };

    const getData = async () => {
        await fetch('/api/get-quests')
            .then(res => res.json())
            .then(data => {
                setQuetes(data.data.rows);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            })
    }

    const validQuest = async (qrCodeValue) => {
        await fetch(`/api/valid-quest?qrCodeValue=${qrCodeValue}`).then(res => res.json())
            .then(data => {
                console.log(data);
                setDecodedValue("");
                getData();
            })
            .catch(err => console.log(err))
    }

    // valid la quete si il y a un qr code
    useEffect(() => {
        if (decodedValue) {
            console.log('decodedValue', decodedValue)
            validQuest(decodedValue);
        }
    }, [decodedValue])


    useEffect(() => {
        getData();
    }, [])

    return (
        <main>
            {isDesktop ? (
                <p>Cette application est optimisée pour les appareils mobiles. Veuillez ouvrir cette page sur un appareil mobile.</p>
            ) : (
                // Votre contenu pour les appareils mobiles
                <div>
                    <h1>Quêtes</h1>
                    {loading && <p>Chargement...</p>}
                    {!loading && <QuestList quetes={quetes} />}
                    {/* <PhotoCapture /> */}
                    <CodeReader onResult={handleResult} />
                </div>
            )}

        </main>
    );
}
