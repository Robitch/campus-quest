import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const CodeReader = ({ onResult }) => {
    const fileRef = useRef(null);
    const [cameraList, setCameraList] = useState([]);
    const [activeCamera, setActiveCamera] = useState();
    const [scannerStarted, setScannerStarted] = useState(false); // Ajout de l'état du scanner

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        let currentScanner = html5QrCode; // Stockage de l'instance du scanner

        const startScanner = async () => {
            try {
                await currentScanner.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: { width: 300, height: 300 } },
                    (decodedText) => {
                        onResult(decodedText);
                        currentScanner.clear();
                    }
                );
                setScannerStarted(true); // Mise à jour de l'état du scanner
            } catch (err) {
                console.error("Error starting scanner: ", err);
            }
        };

        startScanner(); // Démarrage du scanner

        Html5Qrcode.getCameras()
            .then((devices) => {
                setCameraList(devices);
                setActiveCamera(devices[0]);
            })
            .catch((err) => {
                console.error("Error getting cameras: ", err);
                setCameraList([]);
            });

        // Nettoyage du scanner lorsque le composant est démonté
        return () => {
            if (scannerStarted) { // Vérification si le scanner est démarré
                currentScanner.stop().catch((err) => console.error(err));
            }
        };
    }, [onResult, scannerStarted]);
    const onCameraChange = (e) => {
        const selectedCamera = e.target.options[e.target.selectedIndex];
        const cameraId = selectedCamera.dataset.key;
        setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
    };

    const scanLocalFile = () => {
        fileRef.current.click();
    };

    const scanFile = (e) => {
        if (e.target.files.length === 0) {
            return;
        }
        const imageFile = e.target.files[0];
        Html5Qrcode.scanFile(imageFile, true)
            .then((qrCodeMessage) => {
                onResult(qrCodeMessage);
            })
            .catch((err) => {
                console.log(`Error scanning file: ${err}`);
            });
    };

    return (
        <div style={{ position: "relative" }}>
            <div id="reader" width="100%" />
            <button onClick={scanLocalFile}>Scan local file</button>
            <input
                type="file"
                hidden
                ref={fileRef}
                accept="image/*"
                onChange={scanFile}
            />
            {cameraList.length > 0 && (
                <select onChange={onCameraChange}>
                    {cameraList.map((li) => (
                        <option
                            key={li.id}
                            id={li.id}
                            selected={activeCamera && activeCamera.id === li.id}
                        >
                            {li.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CodeReader;
