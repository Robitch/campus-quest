"use client";

import { useEffect, useState } from 'react';
import QuestList from '../components/QuestList';
import CodeReader from '../components/CodeReader';
import PhotoCapture from '../components/PhotoCapture';

export default function Home() {
    const [quetes, setQuetes] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <h1>Quêtes</h1>
            {loading && <p>Chargement...</p>}
            {!loading && <QuestList quetes={quetes} />}
            {/* <PhotoCapture /> */}
            <CodeReader onResult={handleResult} />

        </main>
    );
}
