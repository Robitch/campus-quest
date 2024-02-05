"use client";

import { useEffect, useState } from 'react';
import QuestList from '../components/QuestList';
import PhotoCapture from '../components/PhotoCapture';

export default function Home() {
    const [quetes, setQuetes] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        getData();
    }, [])

    return (
        <main>
            <h1>Quêtes</h1>
            {loading && <p>Chargement...</p>}
            {!loading && <QuestList quetes={quetes} />}
            <PhotoCapture />
        </main>
    );
}
